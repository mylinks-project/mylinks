import { BsGithub } from "react-icons/bs";
import { Button } from "../ui/button";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 ">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Empowering you to connect, share, and grow with simplicity and style.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Founded in 2024, our platform is designed to help individuals and businesses 
            streamline their online presence. We aim to make the web more navigable through 
            elegant and powerful tools for managing and sharing links.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
          <p>
            We envision a world where everyone can share their content effortlessly 
            and effectively. Through innovation and simplicity, we strive to bring 
            the best user experience to our community.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
          <ul className="space-y-4">
            <li>
              <strong>Simplicity</strong> - Making complex processes intuitive and easy.
            </li>
            <li>
              <strong>Security</strong> - Ensuring your trust and privacy are always safeguarded.
            </li>
            <li>
              <strong>Innovation</strong> - Continuously evolving to meet modern web needs.
            </li>
            <li>
              <strong>Community</strong> - Building a space where everyone can contribute.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Open Source Contribution</h2>
          <p>
            We believe in the power of open source. Our platform thrives on collaboration, 
            and we welcome contributors from all over the world. If you’d like to make an 
            impact, check out our GitHub repository and join the community.
          </p>
          <p>
            Your ideas, code, and feedback are invaluable. Together, we can build a better, 
            more connected web.
          </p>
          <div className="mt-5">
          <Link href={'https://github.com/mylinks-project'} target="_blank" >
            <Button >
              <BsGithub className="h-4 w-4" />
              Github
            </Button>
          </Link>
        </div >
        </div>
      </div>
    </div>
  );
}
