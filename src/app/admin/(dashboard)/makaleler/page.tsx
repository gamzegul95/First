import Link from "next/link";
import { Plus, Pencil, Newspaper } from "lucide-react";
import { getArticles } from "@/lib/data";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteArticle } from "./actions";

export default async function ArticlesAdminPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-stone-50">Makaleler</h1>
          <p className="mt-1 text-sm text-stone-400">Makalelerinizi ekleyin, düzenleyin veya kaldırın.</p>
        </div>
        <Link
          href="/admin/makaleler/yeni"
          className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_100%] px-5 py-2.5 text-sm font-semibold text-ink-950 transition-all duration-500 hover:bg-[position:100%_0]"
        >
          <Plus className="h-4 w-4" />
          Yeni Makale
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex items-center gap-4 rounded-sm border border-ink-border bg-ink-900/40 p-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-gold-700/40 bg-gold-500/5 text-gold-400">
              <Newspaper className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-stone-100">{article.title}</p>
              <p className="truncate text-xs text-stone-500">/makaleler/{article.slug}</p>
            </div>
            <span className="hidden shrink-0 text-xs text-stone-500 sm:block">Sıra: {article.order}</span>
            <Link
              href={`/admin/makaleler/${article.id}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-ink-border text-stone-400 transition-colors hover:border-gold-500 hover:text-gold-300"
            >
              <Pencil className="h-4 w-4" />
            </Link>
            <DeleteButton action={deleteArticle.bind(null, article.id)} confirmText="Bu makaleyi silmek istediğinize emin misiniz?" />
          </div>
        ))}
        {articles.length === 0 && (
          <p className="rounded-sm border border-dashed border-ink-border p-8 text-center text-sm text-stone-500">
            Henüz makale eklenmedi.
          </p>
        )}
      </div>
    </div>
  );
}
