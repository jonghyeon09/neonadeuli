type Props = {
  questions: string[];
  onClick: (question: string) => void;
};

export default function RecommendationQuestion({
  questions = [],
  onClick,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="body-3 text-neutrals-1200">추천 질문</p>
      <div className="flex flex-col p-3 gap-2">
        {questions.map((question) => (
          <div key={question}>
            <button onClick={() => onClick(question)}>
              <p className="bg-primary-100 p-3 inline-block rounded-tl-[10px] rounded-br-[10px] body-3">
                + {question}
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
