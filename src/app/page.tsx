import MemoryGame from "@/components/section/MemoryGame";

export default function Home() {
  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-center p-4 md:p-12 overflow-hidden">
      <h1 className="text-xl md:text-4xl font-bold">Memory Card Game</h1>
      <MemoryGame />
    </main>
  );
}
