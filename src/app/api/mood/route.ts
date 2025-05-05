import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { MoodLog } from '@/models/MoodLog';
import { moodValues } from '@/utils/moodConfig';
import { getAuth } from 'firebase-admin/auth';
import { initAdmin } from '@/lib/firebase-admin';

interface MoodLogBody {
  mood: keyof typeof moodValues;
  journal?: string;
  sleep?: string;
  tags?: string[];
}

// Initialize Firebase Admin
initAdmin();

// Helper function to get user ID from auth token
async function getUserId(request: Request): Promise<string> {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('No authentication token provided');
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error('Error verifying auth token:', error);
    throw new Error('Invalid authentication');
  }
}

// GET /api/mood - Get mood logs for the current user
export async function GET(request: Request) {
  try {
    const userId = await getUserId(request);
    await connectDB();
    console.log('GET /api/mood - Connected to MongoDB');

    // Get the last 30 days of mood logs for the specific user
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await MoodLog.find({
      userId,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: -1 });

    console.log(`GET /api/mood - Retrieved ${logs.length} logs for user ${userId}`);
    return NextResponse.json(logs);
  } catch (error: unknown) {
    console.error('GET /api/mood - Error:', error);
    if (error instanceof Error && error.message === 'Invalid authentication') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/mood - Create a new mood log
export async function POST(request: Request) {
  try {
    const userId = await getUserId(request);
    const body = await request.json() as MoodLogBody;
    console.log('POST /api/mood - Request body:', body);

    // Convert string mood to numeric value
    const moodValue = moodValues[body.mood];
    if (!moodValue) {
      console.error('POST /api/mood - Invalid mood value:', body.mood);
      return NextResponse.json({ error: 'Invalid mood value' }, { status: 400 });
    }

    await connectDB();
    console.log('POST /api/mood - Connected to MongoDB');

    // Extract sleep hours from string (e.g., "7-8 hours" -> 7.5)
    let sleepHours: number | undefined;
    if (body.sleep) {
      const match = body.sleep.match(/(\d+)[-+]?(\d+)?/);
      if (match) {
        if (match[2]) {
          sleepHours = (parseInt(match[1]) + parseInt(match[2])) / 2;
        } else {
          sleepHours = parseInt(match[1]);
        }
      }
    }

    const moodLog = new MoodLog({
      userId,
      mood: moodValue,
      notes: body.journal,
      sleepHours,
      date: new Date(),
      tags: body.tags
    });

    console.log('POST /api/mood - Saving mood log:', moodLog);
    
    const savedLog = await moodLog.save();
    console.log('POST /api/mood - Successfully saved mood log:', savedLog);
    return NextResponse.json(savedLog);
  } catch (error: unknown) {
    console.error('POST /api/mood - Error:', error);
    if (error instanceof Error && error.message === 'Invalid authentication') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 