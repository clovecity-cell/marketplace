// Firebase Configuration for Flutter Mobile App
import 'package:flutter_dotenv/flutter_dotenv.dart';

class FirebaseConfig {
  static String get apiKey => dotenv.env['FIREBASE_API_KEY'] ?? '';
  static String get projectId => dotenv.env['FIREBASE_PROJECT_ID'] ?? 'cocokin-app';
  static String get appId => dotenv.env['FIREBASE_APP_ID'] ?? '1:1234567890:android:abc123def';
  static String get messagingSenderId => dotenv.env['FIREBASE_MESSAGING_SENDER_ID'] ?? '1234567890';
  static String get storageBucket => dotenv.env['FIREBASE_STORAGE_BUCKET'] ?? 'cocokin-app.appspot.com';

  static Future<void> initialize() async {
    // In production Flutter app:
    // await Firebase.initializeApp(
    //   options: FirebaseOptions(
    //     apiKey: apiKey,
    //     appId: appId,
    //     messagingSenderId: messagingSenderId,
    //     projectId: projectId,
    //     storageBucket: storageBucket,
    //   ),
    // );
    print('Firebase Initialized for cocok.in Flutter app ($projectId)');
  }
}
