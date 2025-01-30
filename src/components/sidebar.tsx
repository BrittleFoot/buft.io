import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

export function Sidebar() {
    return (
        <div className="flex flex-col gap-2 flex-wrap">
            <Card className="backdrop-blur bg-card/70">
                <CardHeader>
                    <CardTitle>Hello!</CardTitle>
                    <CardDescription>Welcome to my website!</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
