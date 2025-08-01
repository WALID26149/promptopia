'use client';

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { user } = useKindeAuth();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.creator._id === user?.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          {post.creator?.image && (
  <Image
    src={post.creator.image}
    alt='user_image'
    width={40}
    height={40}
    className='rounded-full object-contain'
  />
)}


          <div className='flex flex-col'>
          {post.creator?.username && (
  <h3 className='font-satoshi font-semibold text-gray-900'>
    {post.creator.username}
  </h3>
)}

{post.creator?.email && (
  <p className='font-inter text-sm text-gray-500'>
    {post.creator.email}
  </p>
)}

          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
        {post.creator?.email && (
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        )}
        </div>
      </div>

      {post.creator?.email && ( 
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
    )}

{post.creator?.email && (
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      )}

{user?.id && post?.creator?.id && post.creator.id === user.id && pathName === "/profile" && (
  <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
    <p
      className='font-inter text-sm green_gradient cursor-pointer'
      onClick={handleEdit}
    >
      Edit
    </p>
    <p
      className='font-inter text-sm orange_gradient cursor-pointer'
      onClick={handleDelete}
    >
      Delete
    </p>
  </div>
)}
    </div>
  );
};

export default PromptCard;
