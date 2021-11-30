import Image from "next/image";
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";

function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
      <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-24 xl:-mr-5 mt-auto"
      >
        <img
          src="data:image/png;base64,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"
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">Jack</h4>
          <p className="text-[#6e767d]">@jack1234</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  )
}

export default Sidebar
