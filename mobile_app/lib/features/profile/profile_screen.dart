// ProfileScreen for Flutter Mobile App with Role-Based Rendering
import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  final List<String> userRoles; // e.g. ['buyer', 'seller', 'courier'] or ['admin']

  const ProfileScreen({Key? key, this.userRoles = const ['buyer', 'seller']}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isAdmin = userRoles.contains('admin');

    if (isAdmin) {
      return Scaffold(
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.admin_panel_settings, size: 72, color: Color(0xFF2563EB)),
                const SizedBox(height: 16),
                const Text(
                  'Akses Khusus Admin',
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Silakan akses Admin Web di browser untuk mengelola platform cocok.in.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 14, color: Colors.grey),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF2563EB)),
                  onPressed: () {},
                  child: const Text('Buka Admin Web Portal', style: TextStyle(color: Colors.white)),
                )
              ],
            ),
          ),
        ),
      );
    }

    final isSeller = userRoles.contains('seller');
    final isCourier = userRoles.contains('courier');

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil Saya', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Avatar & Name Card
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  const CircleAvatar(
                    radius: 30,
                    backgroundColor: Color(0xFF2563EB),
                    child: Icon(Icons.person, color: Colors.white, size: 36),
                  ),
                  const SizedBox(width: 16),
                  Column(
                    crossAxisAlignment: CrossAlignment.start,
                    children: const [
                      Text('Andi Pratama', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                      SizedBox(height: 4),
                      Text('andi@gmail.com', style: TextStyle(fontSize: 12, color: Colors.grey)),
                    ],
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 16),
          // Wallet Balance Card
          Card(
            color: const Color(0xFF2563EB),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAlignment.start,
                    children: const [
                      Text('Saldo Wallet cocok.in', style: TextStyle(color: Colors.white70, fontSize: 12)),
                      SizedBox(height: 4),
                      Text('Rp 1.500.000', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF16A34A)),
                    onPressed: () {},
                    child: const Text('Top Up', style: TextStyle(color: Colors.white)),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 20),
          const Text('Menu Utama', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.grey)),
          const SizedBox(height: 8),

          ListTile(
            leading: const Icon(Icons.shopping_bag_outlined, color: Color(0xFF2563EB)),
            title: const Text('Pesanan Saya'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {},
          ),

          if (isSeller)
            ListTile(
              leading: const Icon(Icons.storefront, color: Color(0xFF16A34A)),
              title: const Text('Toko Saya (Dashboard Penjual)'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {},
            ),

          if (isCourier)
            ListTile(
              leading: const Icon(Icons.local_shipping_outlined, color: Colors.orange),
              title: const Text('Pengiriman Saya (Dashboard Kurir)'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {},
            ),

          ListTile(
            leading: const Icon(Icons.settings_outlined),
            title: const Text('Pengaturan Akun'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {},
          ),

          ListTile(
            leading: const Icon(Icons.logout, color: Colors.red),
            title: const Text('Logout', style: TextStyle(color: Colors.red)),
            onTap: () {},
          ),
        ],
      ),
    );
  }
}
