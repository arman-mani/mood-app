import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';

export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  try {
    await connectDB();
    
    const user = await User.findOne({ firebaseUid: params.uid });
    if (!user || !user.photoURL) {
      return new NextResponse('/assets/images/avatar-placeholder.svg', {
        status: 302,
        headers: {
          'Location': '/assets/images/avatar-placeholder.svg'
        }
      });
    }

    // If the photoURL is a data URL, return it directly
    if (user.photoURL.startsWith('data:')) {
      const [header, data] = user.photoURL.split(',');
      const contentType = header.split(';')[0].split(':')[1];
      
      return new NextResponse(Buffer.from(data, 'base64'), {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    // If it's a regular URL, redirect to it
    return new NextResponse(user.photoURL, {
      status: 302,
      headers: {
        'Location': user.photoURL
      }
    });
  } catch (error) {
    console.error('Error serving user photo:', error);
    return new NextResponse('/assets/images/avatar-placeholder.svg', {
      status: 302,
      headers: {
        'Location': '/assets/images/avatar-placeholder.svg'
      }
    });
  }
} 