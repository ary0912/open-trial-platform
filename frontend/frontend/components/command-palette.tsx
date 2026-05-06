"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Upload,
  FlaskConical,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  Search,
  FileSpreadsheet,
  Users,
  BarChart3,
} from "lucide-react"
import { useTheme } from "next-themes"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              <LayoutDashboard className="mr-2 size-4" />
              <span>Dashboard</span>
              <CommandShortcut>D</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/studies"))}
            >
              <FlaskConical className="mr-2 size-4" />
              <span>Studies</span>
              <CommandShortcut>S</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/upload"))}
            >
              <Upload className="mr-2 size-4" />
              <span>Upload Dataset</span>
              <CommandShortcut>U</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/studies?create=true"))}
            >
              <FlaskConical className="mr-2 size-4" />
              <span>Create New Study</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/upload"))}
            >
              <FileSpreadsheet className="mr-2 size-4" />
              <span>Import CSV Data</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Analytics">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              <BarChart3 className="mr-2 size-4" />
              <span>View Analytics</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              <Users className="mr-2 size-4" />
              <span>View Participants</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() =>
                runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))
              }
            >
              <Sun className="mr-2 size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Toggle Theme</span>
              <CommandShortcut>T</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 size-4" />
              <span>Settings</span>
            </CommandItem>
            <CommandItem>
              <HelpCircle className="mr-2 size-4" />
              <span>Help & Support</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
