export default async function WikiHomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">위키</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>왼쪽의 카테고리를 선택하여 문서를 확인하세요.</p>
      </div>
    </>
  );
}