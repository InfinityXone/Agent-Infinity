"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RightPanel } from "@/components/right-panel"
import { Shield, Database, Users, Activity, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuperAdmin() {
  const [activeModule, setActiveModule] = useState("super-admin")
  const [systemStatus, setSystemStatus] = useState({
    database: "online",
    api: "online",
    storage: "online",
    ai_services: "online",
  })

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 flex h-screen">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

        <div className="flex-1 flex flex-col h-full">
          <div className="p-6 border-b border-red-500/20 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-red-400" />
              <div>
                <h1 className="text-3xl font-bold text-red-400">Super Admin</h1>
                <p className="text-gray-400">System Administration & Monitoring</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-900/50 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-400 text-lg flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">Online</div>
                  <p className="text-gray-400 text-sm">All systems operational</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-400 text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    API Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">Online</div>
                  <p className="text-gray-400 text-sm">All endpoints responding</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-400 text-lg">Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">Online</div>
                  <p className="text-gray-400 text-sm">85% capacity</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-yellow-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-400 text-lg">AI Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">Warning</div>
                  <p className="text-gray-400 text-sm">High usage detected</p>
                </CardContent>
              </Card>
            </div>

            {/* Admin Actions */}
            <Card className="bg-gray-900/50 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Administrative Actions
                </CardTitle>
                <CardDescription className="text-gray-400">System management and control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    <Database className="w-4 h-4 mr-2" />
                    Database Backup
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Users className="w-4 h-4 mr-2" />
                    User Management
                  </Button>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Activity className="w-4 h-4 mr-2" />
                    System Logs
                  </Button>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Audit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Metrics */}
            <Card className="bg-gray-900/50 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400">System Metrics</CardTitle>
                <CardDescription className="text-gray-400">Real-time system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">CPU Usage</span>
                    <span className="text-green-400">23%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Memory Usage</span>
                    <span className="text-yellow-400">67%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Active Users</span>
                    <span className="text-cyan-400">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">API Requests/min</span>
                    <span className="text-blue-400">3,456</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  )
}
