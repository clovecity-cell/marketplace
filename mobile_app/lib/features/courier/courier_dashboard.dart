// CourierDashboard for Flutter Mobile App
import 'package:flutter/material.dart';

class CourierDashboard extends StatefulWidget {
  const CourierDashboard({Key? key}) : super(key: key);

  @override
  State<CourierDashboard> createState() => _CourierDashboardState();
}

class _CourierDashboardState extends State<CourierDashboard> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard Kurir Express', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
        bottom: TabBar(
          controller: _tabController,
          labelColor: const Color(0xFF2563EB),
          unselectedLabelColor: Colors.grey,
          indicatorColor: const Color(0xFF2563EB),
          tabs: const [
            Tab(text: 'Order Tersedia'),
            Tab(text: 'Aktif'),
            Tab(text: 'Riwayat'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Order Tersedia Tab (Based on GPS Distance)
          ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Card(
                child: ListTile(
                  leading: const CircleAvatar(backgroundColor: Color(0xFF2563EB), child: Icon(Icons.navigation, color: Colors.white)),
                  title: const Text('Order #ORD-2026-001 (1.2 km dari Anda)'),
                  subtitle: const Text('Jemput: Toko Berkah -> Antar: Jl. Sudirman 45'),
                  trailing: ElevatedButton(
                    style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF16A34A)),
                    onPressed: () {},
                    child: const Text('Ambil', style: TextStyle(color: Colors.white)),
                  ),
                ),
              ),
            ],
          ),

          // Aktif Tab (Update status: ambil -> antar -> sampai + foto bukti)
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.local_shipping, size: 64, color: Color(0xFF2563EB)),
                const SizedBox(height: 12),
                const Text('Pesanan Sedang Diantar', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                const SizedBox(height: 16),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF16A34A)),
                  onPressed: () {
                    // Modal upload foto bukti penerimaan
                  },
                  icon: const Icon(Icons.camera_alt, color: Colors.white),
                  label: const Text('Upload Foto Bukti Sampai', style: TextStyle(color: Colors.white)),
                ),
              ],
            ),
          ),

          // Riwayat & Pendapatan Tab
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAlignment.start,
              children: [
                Text('Total Pendapatan Hari Ini', style: TextStyle(color: Colors.grey)),
                Text('Rp 120.000 (8 Pengiriman)', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF16A34A))),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
