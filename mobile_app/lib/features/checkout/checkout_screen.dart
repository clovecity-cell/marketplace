// CheckoutScreen for Flutter Mobile App
import 'package:flutter/material.dart';

class CheckoutScreen extends StatelessWidget {
  const CheckoutScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Checkout Pesanan', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Address Selection
          const Text('Alamat Pengiriman', style: TextStyle(fontWeight: FontWeight.bold)),
          Card(
            child: ListTile(
              leading: const Icon(Icons.location_on, color: Color(0xFF2563EB)),
              title: const Text('Andi Pratama (Rumah Utama)'),
              subtitle: const Text('Jl. Sudirman No. 45, Jakarta Selatan'),
              trailing: TextButton(onPressed: () {}, child: const Text('Ubah')),
            ),
          ),
          const SizedBox(height: 16),

          // Courier Selection
          const Text('Pilih Kurir Pengiriman', style: TextStyle(fontWeight: FontWeight.bold)),
          Card(
            child: Column(
              children: [
                RadioListTile(
                  value: 'platform',
                  groupValue: 'platform',
                  onChanged: (val) {},
                  title: const Text('Kurir Internal cocok.in (Express 1 Jam)'),
                  subtitle: const Text('Rp 15.000'),
                ),
                RadioListTile(
                  value: 'seller_courier',
                  groupValue: 'platform',
                  onChanged: (val) {},
                  title: const Text('Kurir Pribadi Penjual'),
                  subtitle: const Text('Rp 10.000'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Fee Details
          const Text('Rincian Biaya', style: TextStyle(fontWeight: FontWeight.bold)),
          const Card(
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Column(
                children: [
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text('Subtotal Produk'), Text('Rp 130.000')]),
                  SizedBox(height: 6),
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text('Ongkos Kirim'), Text('Rp 15.000')]),
                  SizedBox(height: 6),
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text('Biaya Layanan'), Text('Rp 6.500')]),
                  Divider(),
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    Text('Grand Total', style: TextStyle(fontWeight: FontWeight.bold)),
                    Text('Rp 151.500', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF2563EB))),
                  ]),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF16A34A),
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () {
              // Call Cloud Function processPayment
            },
            child: const Text('Bayar dengan Wallet cocok.in', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
        ],
      ),
    );
  }
}
