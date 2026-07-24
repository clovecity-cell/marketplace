import 'dart:convert';
import 'package:http/http.dart' as http;

class RealApiService {
  static const String baseUrl = 'http://127.0.0.1:3000';

  static Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/mobile/auth'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }

      return {'success': false, 'message': 'Login gagal (${response.statusCode})'};
    } catch (e) {
      return {'success': false, 'message': e.toString()};
    }
  }

  static Future<Map<String, dynamic>> pay(String orderId, double amount, double walletBalance) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/mobile/payment'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'orderId': orderId, 'amount': amount, 'userWallet': walletBalance}),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }

      return {'success': false, 'message': 'Pembayaran gagal (${response.statusCode})'};
    } catch (e) {
      return {'success': false, 'message': e.toString()};
    }
  }

  static Future<List<dynamic>> getProducts() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/api/products'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body) as List<dynamic>;
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  static Future<List<dynamic>> getOrders() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/api/orders'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body) as List<dynamic>;
      }
      return [];
    } catch (e) {
      return [];
    }
  }
}
