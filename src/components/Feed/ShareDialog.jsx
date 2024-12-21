export default function ShareDialog({ url, setShowModal, handleCopy }) {
    const ShareButtons = [
        {
            name : "Twitter",
            icon : "/share/twitter.svg",
            color : "bg-blue-100",
            url : `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
        },
        {
            name :  "Facebook",
            icon : "/share/facebook.svg",
            color : "bg-indigo-100",
            url : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
            name : "Reddit",
            icon : "/share/reddit.svg",
            color : "bg-orange-100",
            url : `https://www.reddit.com/submit?url=${encodeURIComponent(url)}`,
        },
        {
            name : "Discord",
            icon : "/share/discord.svg",
            color : "bg-purple-100",
            url : `https://discord.com/`,
        },
        {
            name : "WhatsApp",
            icon : "/share/whatsapp.svg",
            color : "bg-green-100",
            url : `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
        },
        {
            name : "Messenger",
            icon : "/share/messenger.svg",
            color : "bg-blue-100",
            url : `https://www.messenger.com/`,
        },
        {
            name : "Telegram",
            icon : "/share/telegram.svg",
            color : "bg-blue-100",
            url : `https://t.me/share/url?url=${encodeURIComponent(url)}`,
        },
        {
            name : "Instagram",
            icon : "/share/instagram.svg",
            color : "bg-red-100",
            url : `https://www.instagram.com/`,
        }
    ]

    return <div className="bg-white p-6 rounded-xl w-fit h-96">
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Share Post</h1>
            <button onClick={() => setShowModal(false)} className="bg-gray-100 p-2 rounded-full">
                <img src="/share/close.svg" className="w-5 h-5" />
            </button>
        </div>


        <div className="grid grid-cols-4 gap-4 mt-4">
           {ShareButtons.map((button)=> <div className="flex flex-col items-center gap-2">
                <a target="_blank" href={button.url} className={`${button.color} p-3 rounded-full`}>
                    <img src={button.icon} className="w-6 h-6" />
                </a>
                <span className="text-xs text-gray-500">{button.name}</span>
            </div>)}
        </div>

        <h3 className="text-lg font-bold mt-6">Post link</h3>
        <div className="w-full p-2 mt-2 rounded-md flex flex-row items-center bg-gray-100">
            <span type="text" className="w-[95%] overflow-clip text-xs text-gray-500 mx-2 ">{url}</span>
            <button onClick={handleCopy} className=" p-2 rounded-md"><img src="/share/copy.svg" className="w-5 h-5 right-4 top-4" /></button>
        </div>
    </div>
}