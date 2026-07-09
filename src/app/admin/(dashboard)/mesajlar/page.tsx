import { prisma } from "@/lib/prisma";
import MessageRow from "@/components/admin/MessageRow";

export default async function MessagesAdminPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-50">Mesajlar</h1>
      <p className="mt-1 text-sm text-stone-400">İletişim formundan gelen talepler.</p>

      <div className="mt-8 space-y-3">
        {messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}
        {messages.length === 0 && (
          <p className="rounded-sm border border-dashed border-ink-border p-8 text-center text-sm text-stone-500">
            Henüz mesaj gelmedi.
          </p>
        )}
      </div>
    </div>
  );
}
