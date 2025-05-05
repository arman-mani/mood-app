import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';

// GET /api/user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get('firebaseUid');

    if (!firebaseUid) {
      return NextResponse.json({ error: 'Firebase UID is required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firebaseUid, displayName, email, photoURL } = body;

    if (!firebaseUid || !displayName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    // Update or create user
    const user = await User.findOneAndUpdate(
      { firebaseUid },
      { displayName, email, photoURL },
      { new: true, upsert: true }
    );

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 