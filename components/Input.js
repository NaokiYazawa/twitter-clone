import { useRef, useState } from "react";

// icons
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

// firebase
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

// emoji
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function Input() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const filePickerRef = useRef(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      // id: session.user.uid,
      // username: session.user.name,
      // userImg: session.user.image,
      // tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const addEmoji = (e) => {
    console.log(e.unified)
    let sym = e.unified.split("-");
    console.log(sym)
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    console.log(codesArray)
    let emoji = String.fromCodePoint(...codesArray);
    console.log(emoji)
    setInput(input + emoji);
  }

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${
        loading && "opacity-60"
      }`}
    >
      <img
        src="data:image/png;base64,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"
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
        // onClick={signOut}
      />
      <div className="divide-y divide-gray-700 w-full">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows="2"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                <input
                  type="file"
                  ref={filePickerRef}
                  hidden
                  onChange={addImageToPost}
                />
              </div>

              <div className="icon rotate-90">
                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div
                className="icon"
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
            </div>
            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
