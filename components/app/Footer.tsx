import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
  const routes = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Mylinks</h3>
            <p className="text-sm text-muted-foreground">
              Making the web more accessible, one link at a time.
            </p>
            <div className="flex space-x-3">
              <Link href={'https://github.com/mylinks-project'} target="_blank">
                <Button variant="ghost" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              {routes.map((route, i) =>
                <li key={i}>
                  <Link href={route.href} className="text-muted-foreground hover:text-foreground">
                    {route.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mylinks. All rights reserved.
        </div>
      </div>
    </footer >
  );
};