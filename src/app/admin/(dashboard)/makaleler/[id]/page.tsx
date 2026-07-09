import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { updateArticle, deleteArticle } from "../actions";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/admin/makaleler" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-gold-300">
          <ChevronLeft className="h-4 w-4" />
          Makaleler
        </Link>
        <DeleteButton
          action={deleteArticle.bind(null, article.id)}
          confirmText="Bu makaleyi silmek istediğinize emin misiniz?"
        />
      </div>
      <h1 className="mt-4 font-display text-2xl font-semibold text-stone-50">{article.title}</h1>

      <div className="mt-8">
        <ArticleForm action={updateArticle.bind(null, article.id)} article={article} />
      </div>
    </div>
  );
}
