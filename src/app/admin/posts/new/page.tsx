import { PostForm } from "@/app/admin/_components/PostForm";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-[2.25rem] leading-[1.1] font-bold tracking-tight text-ink">
        Nuovo post
      </h1>
      <PostForm />
    </div>
  );
}
