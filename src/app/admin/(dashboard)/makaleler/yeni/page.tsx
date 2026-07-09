import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ArticleForm from "@/components/admin/ArticleForm";
import { createArticle } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <Link href="/admin/makaleler" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-gold-300">
        <ChevronLeft className="h-4 w-4" />
        Makaleler
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-stone-50">Yeni Makale</h1>

      <div className="mt-8">
        <ArticleForm action={createArticle} saveLabel="Oluştur" />
      </div>
    </div>
  );
}
