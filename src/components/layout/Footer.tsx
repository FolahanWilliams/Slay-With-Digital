import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © {new Date().getFullYear()} Slay With Digital Consulting. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6">
                        <Link
                            href="mailto:yetty@yettywilliams.com"
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/yettywilliams/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground transition-colors hover:text-primary"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
