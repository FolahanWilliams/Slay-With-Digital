import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export function Navigation() {
    const links = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
                <Link href="/" className="font-heading text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80">
                    Slay With Digital
                </Link>
                <nav className="hidden items-center space-x-8 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button asChild className="rounded-full bg-primary font-medium text-primary-foreground hover:bg-primary/90">
                        <a href="mailto:yetty@yettywilliams.com">Book a Consultation</a>
                    </Button>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="flex flex-col gap-6 pr-0 pt-10">
                        <Link
                            href="/"
                            className="font-heading text-lg font-bold"
                        >
                            Slay With Digital
                        </Link>
                        <div className="flex flex-col gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium text-foreground/80 hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-4">
                                <Button asChild className="w-full rounded-full bg-primary font-medium text-primary-foreground hover:bg-primary/90">
                                    <a href="mailto:yetty@yettywilliams.com">Book a Consultation</a>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
