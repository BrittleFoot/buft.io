'use client'

import { ConfigProvider } from './config'
import { Scene } from './scene'
import { Sidebar } from './sidebar'

export function Home() {
    return (
        <ConfigProvider>
            <div className="relative h-full">
                <div className="absolute inset-2 z-[100] max-w-80">
                    <Sidebar />
                </div>
                <Scene />
            </div>
        </ConfigProvider>
    )
}
