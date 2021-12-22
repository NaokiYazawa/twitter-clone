import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import Post from "../components/Post";
import { db } from "../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Comment from "../components/Comment";
import Head from "next/head";

function PostPage() {
  return (
    <div>
      
    </div>
  )
}

export default PostPage
