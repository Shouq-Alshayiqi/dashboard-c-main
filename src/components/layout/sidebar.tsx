export const Sidebar = () => {
  return (
    <div className="hidden border-r bg-background lg:block lg:w-64">
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-1 p-4">
          <a
            href="/"
            className="flex items-center rounded-lg px-3 py-2 text-foreground hover:bg-accent"
          >
            <span className="ml-3">Dashboard</span>
          </a>
          <a
            href="/analytics"
            className="flex items-center rounded-lg px-3 py-2 text-foreground hover:bg-accent"
          >
            <span className="ml-3">Analytics</span>
          </a>
          <a
            href="/reports"
            className="flex items-center rounded-lg px-3 py-2 text-foreground hover:bg-accent"
          >
            <span className="ml-3">Reports</span>
          </a>
        </div>
      </div>
    </div>
  )
} 