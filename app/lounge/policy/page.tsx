export default function PolicyPage() {
  return (
    <main className="bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8 mt-8">신청 및 참가 안내</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#9CB7A4]">1. 신청 접수</h2>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex gap-2">
              <span className="text-[#9CB7A4]">•</span>
              <span>
                <strong>신청 마감:</strong> 모임 시작 전월 말일까지 (예: 2월 모임은 1월 31일 마감)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#9CB7A4]">•</span>
              <span>
                <strong>참가 확정:</strong> 신청 순이 아닌, 입금 완료 순으로 참가가 확정됩니다
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#9CB7A4]">•</span>
              <span>
                <strong>조기 마감:</strong> 정원 충족 시 마감일 이전에도 조기 마감될 수 있습니다
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#9CB7A4]">•</span>
              <span>
                <strong>최소 인원:</strong> 반 구성 최소 인원은 3명이며, 미달 시 모임이 취소되고 전액
                환불됩니다
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#9CB7A4]">2. 참가 확정 및 안내</h2>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex gap-2">
              <span className="text-[#9CB7A4]">•</span>
              <span>입금 확인 후 문자메시지로 참가 확정을 개별 안내해드립니다</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#9CB7A4]">•</span>
              <span>반 확정 시 카카오톡 단체방을 개설하여 상세 일정과 공지사항을 안내합니다</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#9CB7A4]">•</span>
              <span>모임 일정 변경 시 문자메시지로 사전 안내드립니다</span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#9CB7A4]">3. 향후 운영 예정</h2>
          <div className="bg-foreground/5 rounded-lg p-6">
            <ul className="space-y-2 text-foreground/80">
              <li>
                <strong>2월:</strong> 입문반 1기-1
              </li>
              <li>
                <strong>3월:</strong> 입문반 1기-2, 초급반 1기-1
              </li>
              <li>
                <strong>4월:</strong> 입문반 2기-1, 초급반 2기-2
              </li>
              <li>
                <strong>5월:</strong> 초급반 2기-3, 입문반 2기-2
              </li>
            </ul>
            <p className="text-sm text-foreground/60 mt-4">
              ※ 상기 일정은 운영 상황에 따라 변경될 수 있습니다
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
