// API Service Wrapper for Cloud Functions (Callable & HTTPS)
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'https://asia-southeast1-cocokin-app.cloudfunctions.net';

  // Process payment using Cloud Function
  static Future<Map<String, dynamic>> processPayment(String orderId, double amount, String userId) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/processPayment'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'data': {
            'orderId': orderId,
            'amount': amount,
            'userId': userId,
          }
        }),
      );
      if (response.statusCode == 200) {
        final res = jsonDecode(response.body);
        return res['result'] ?? {'success': true, 'message': 'Pembayaran berhasil diproses'};
      }
      return {'success': false, 'message': 'Gagal memproses pembayaran (${response.statusCode})'};
    } catch (e) {
      return {'success': false, 'message': 'Error: ${e.toString()}'};
    }
  }

  // Release payment to seller after order confirmation
  static Future<Map<String, dynamic>> releasePayment(String orderId) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/releasePayment'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'data': {'orderId': orderId}
        }),
      );
      return jsonDecode(response.body)['result'] ?? {'success': true};
    } catch (e) {
      return {'success': false, 'message': e.toString()};
    }
  }

  // Assign courier to order based on location
  static Future<Map<String, dynamic>> assignCourier(String orderId, double lat, double lng) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/assignCourier'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'data': {
            'orderId': orderId,
            'latitude': lat,
            'longitude': lng,
          }
        }),
      );
      return jsonDecode(response.body)['result'] ?? {'success': true};
    } catch (e) {
      return {'success': false, 'message': e.toString()};
    }
  }
}
