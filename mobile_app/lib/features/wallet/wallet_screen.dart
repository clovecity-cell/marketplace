// WalletScreen for Flutter Mobile App
import 'package:flutter/material.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet cocok.in', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Balance Card
          Card(
            color: const Color(0xFF2563EB),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAlignment.start,
                children: [
                  const Text('Saldo Tersedia', style: TextStyle(color: Colors.white70, fontSize: 13)),
                  const SizedBox(height: 6),
                  const Text('Rp 1.500.000', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF16A34A),
                      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                    ),
                    onPressed: () {
                      // Open modal nominal top up
                    },
                    icon: const Icon(Icons.add, color: Colors.white),
                    label: const Text('Top Up Saldo', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Filters for transactions (Masuk / Keluar)
          const Text('Riwayat Transaksi', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          const SizedBox(height: 12),
          Row(
            children: [
              FilterChip(label: const Text('Semua'), selected: true, onSelected: (val) {}),
              const SizedBox(width: 8),
              FilterChip(label: const Text('Uang Masuk'), selected: false, onSelected: (val) {}),
              const SizedBox(width: 8),
              FilterChip(label: const Text('Uang Keluar'), selected: false, onSelected: (val) {}),
            ],
          ),
          const SizedBox(height: 12),

          const ListTile(
            leading: Icon(Icons.arrow_downward, color: Color(0xFF16A34A)),
            title: Text('Top Up Saldo BCA'),
            subtitle: Text('23 Jul 2026, 08:00'),
            trailing: Text('+Rp 500.000', style: TextStyle(color: Color(0xFF16A34A), fontWeight: FontWeight.bold)),
          ),
          const ListTile(
            leading: Icon(Icons.arrow_upward, color: Colors.red),
            title: Text('Pembayaran Order #ORD-2026-001'),
            subtitle: Text('23 Jul 2026, 09:02'),
            trailing: Text('-Rp 151.500', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }
}
