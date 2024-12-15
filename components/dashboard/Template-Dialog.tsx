"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BsThreeDotsVertical } from "react-icons/bs";

type TemplateKey = keyof typeof templates; // "Instagram" | "Twitter" | "YouTube"

const templates = {
    Instagram: {
        platform: "Instagram",
        title: "My Instagram Profile",
        url: "https://instagram.com/<username>",
        linkImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png?20210403190622",
        gifImage: "https://media0.giphy.com/media/3otPoxmSN3r1lNErf2/200.gif?cid=0f949c40bpnv6cbdh8fjrz6pyexc7k4dazqbe6rld0sbjin1&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    Twitter: {
        platform: "Twitter",
        title: "My Twitter Profile",
        url: "https://twitter.com/<username>",
        linkImage: "https://www.logo.wine/a/logo/Twitter/Twitter-Logo.wine.svg",
        gifImage: "https://media3.giphy.com/media/JRE3AvLsSRXg360F6l/200.gif?cid=0f949c40x3w7c7r77ecxjrow40q0acwgbki2bttwaqmu5x6k&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    YouTube: {
        platform: "YouTube",
        title: "My YouTube Channel",
        url: "https://youtube.com/@<channelname>",
        linkImage: "https://t3.ftcdn.net/jpg/04/74/05/94/360_F_474059464_qldYuzxaUWEwNTtYBJ44VN89ARuFktHW.jpg",
        gifImage: "https://media4.giphy.com/media/13Nc3xlO1kGg3S/200.gif?cid=0f949c40ayq93jg9ugju1duvkmspv3l0o9u7p9t3fq5crxh7&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    Facebook: {
        platform: "Facebook",
        title: "My Facebook",
        url: "https://facebook.com/<username>",
        linkImage: "https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9?h=210",
        gifImage: "https://media0.giphy.com/media/3d8mZpR1z4NFy6gIBA/200.gif?cid=0f949c40r5f1p51fzmy8l2i3spn5ve4k1lbr1eghc5d8fuax&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    TikTok: {
        platform: "TikTok",
        title: "My TikTok",
        url: "https://tiktok.com/<username>",
        linkImage: "https://store-images.s-microsoft.com/image/apps.4784.13634052595610511.c45457c9-b4af-46b0-8e61-8d7c0aec3f56.3d483847-81a6-4078-8f83-a35c5c38ee92?h=210",
        gifImage: "https://media1.giphy.com/media/1qZ7Ny4dYqhxwftGvG/200.gif?cid=0f949c4039829tjw5dh7u1degc3gd7d77ms41mlriavbf0pv&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    Snapchat: {
        platform: "Snapchat",
        title: "My Snapchat",
        url: "https://snapchat.com/<username>",
        linkImage: "https://yt3.googleusercontent.com/hNy_TSr82eNOUiiI64ot0E8oH8kzw3npqdajanbEHq4Q9hxGiXIDPThoHjKRBTEGxb2xrOhBKg=s900-c-k-c0x00ffffff-no-rj",
        gifImage: "https://media3.giphy.com/media/3RID97HU3TxEk/200.gif?cid=0f949c40wiskfkmg94mhfqijhty0r6js5f85wivp2jkjhswr&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    LinkedIn: {
        platform: "LinkedIn",
        title: "My LinkedIn",
        url: "https://linkedin.com/in/<username>",
        linkImage: "https://scontent.faip1-1.fna.fbcdn.net/v/t39.30808-1/277519684_10158675188522823_7436488509713286219_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=Re9D_fJo18IQ7kNvgGJ_lyd&_nc_zt=24&_nc_ht=scontent.faip1-1.fna&_nc_gid=AI2iujq0TUKn3HG41K0qtHr&oh=00_AYC0oLs08O99AZykuWFMKiEu4-GFiy3z2z4XLw8wz6y-HA&oe=6764771B",
        gifImage: "https://media2.giphy.com/media/12MMNg7ImOTUoE/200.gif?cid=0f949c40wqxktxfhave4mt8kscs7gbfxc4owmi8rfeqxythz&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    Reddit: {
        platform: "Reddit",
        title: "My Reddit",
        url: "https://reddit.com/user/<username>",
        linkImage: "https://images.squarespace-cdn.com/content/v1/5c5554d316b64061c6f8a20d/1630949829757-WXNOUZ8R4QQCXMIY4YMG/What-Is-The-Reddit-Logo-Called.png?format=2500w",
        gifImage: "https://media1.giphy.com/media/GeimqsH0TLDt4tScGw/200.gif?cid=0f949c401aux3mcfep4zpeipo8egmkxycfjkpzh56cju9wff&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    WhatsApp: {
        platform: "WhatsApp",
        title: "My WhatsApp",
        url: "https://whatsapp.com/<username>",
        linkImage: "https://store-images.s-microsoft.com/image/apps.8453.13655054093851568.4a371b72-2ce8-4bdb-9d83-be49894d3fa0.7f3687b9-847d-4f86-bb5c-c73259e2b38e?h=210",
        gifImage: "https://media0.giphy.com/media/3d8mZpR1z4NFy6gIBA/200.gif?cid=0f949c40r5f1p51fzmy8l2i3spn5ve4k1lbr1eghc5d8fuax&ep=v1_gifs_search&rid=200.gif&ct="
    },
    Telegram: {
        platform: "Telegram",
        title: "My Telegram",
        url: "https://telegram.me/<username>",
        linkImage: "https://www.itvoice.in/wp-content/uploads/2022/06/Telegram-logo-2048x1280.png",
        gifImage: "https://media2.giphy.com/media/B4dt6rXq6nABilHTYM/200.gif?cid=0f949c40xbf2rytebg6qqm34dub5hiack0nl99l4nq6pto0q&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    Discord: {
        platform: "Discord",
        title: "My Discord",
        url: "https://discord.com/users/<username>",
        linkImage: "https://img.freepik.com/premium-vector/modern-badge-discord-icon_578229-169.jpg?w=740",
        gifImage: "https://media2.giphy.com/media/B4dt6rXq6nABilHTYM/200.gif?cid=0f949c40xbf2rytebg6qqm34dub5hiack0nl99l4nq6pto0q&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    GitHub: {
        platform: "GitHub",
        title: "My GitHub",
        url: "https://github.com/<username>",
        linkImage: "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png",
        gifImage: "https://media0.giphy.com/media/Ws6T5PN7wHv3cY8xy8/200.gif?cid=0f949c4038pp9hjp9ii1nbsdisggod1ntdl39n0mq09kxm3l&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    OnlyFans: {
        platform: "OnlyFans",
        title: "My OnlyFans",
        url: "https://onlyfans.com/<username>",
        linkImage: "https://i.pinimg.com/736x/db/61/06/db61064824c35478f29de95608312454.jpg",
        gifImage: "https://media1.giphy.com/media/1qZ7Ny4dYqhxwftGvG/200.gif?cid=0f949c4039829tjw5dh7u1degc3gd7d77ms41mlriavbf0pv&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
    WebSite: {
        platform: "WebSite",
        title: "My Website",
        url: "https://<yourdomain.com>",
        linkImage: "https://t4.ftcdn.net/jpg/01/33/48/03/240_F_133480376_PWlsZ1Bdr2SVnTRpb8jCtY59CyEBdoUt.jpg",
        gifImage: "https://media3.giphy.com/media/2ikwIgNrmPZICNmRyX/200.gif?cid=0f949c40zyynr2elzlbrwvqrvg9t9vuj6zipunf2h2exduad&ep=v1_gifs_search&rid=200.gif&ct=g"
    },
};

export function TemplateDialog({ selectedTemplate, applyTemplate }:
    { selectedTemplate: TemplateKey | null, applyTemplate: (selectedTemplate: TemplateKey) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger asChild>
                <Button className='h-10 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-gray-200 transition-colors sm:inline-flex hover:opacity-80 hover:bg-black/10 trans' >
                    <BsThreeDotsVertical className="h-4 w-4 mr-1" />
                    Select Default Template
                </Button>
            </DialogTrigger>
            <DialogContent className=" ">
                <DialogHeader>
                    <DialogTitle>
                        Select Default Template
                    </DialogTitle>
                </DialogHeader>
                <div className='flex flex-wrap justify-center items-center gap-2'>
                    {Object.keys(templates).map((key) => (
                        <Button
                            key={key}
                            variant={selectedTemplate === key ? 'default' : 'outline'}
                            onClick={() => {
                                applyTemplate(key as keyof typeof templates)
                                setIsOpen(!isOpen)
                            }}
                        >
                            {key}
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}