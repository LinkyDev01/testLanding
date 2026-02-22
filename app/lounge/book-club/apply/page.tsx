"use client"

import { useState, type FormEvent } from "react"
import { trackStandard, trackCustom } from "@/lib/meta-pixel"
import styles from "./page.module.css"

export default function BookClubApplyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([])
  const [exampleVisible, setExampleVisible] = useState<number | null>(null)

  const examples: Record<number, string> = {
    1: `요즘 자꾸 떠오르는 단어는 '유예'예요. 결정을 미루는 것, 아직 정해지지 않은 상태. 언제부터인가 제 삶이 자꾸 '나중에'로 가득 차고 있다는 걸 느끼면서, 이 단어가 무섭기도 하고 이상하게 위안이 되기도 해서 한동안 머릿속을 떠나지 않았어요.`,
    2: `혼자 있을 때 저는 꽤 게을러요. 유튜브를 틀어놓고 아무것도 안 하는 걸 즐기고, 먹고 싶은 거 잔뜩 시켜놓고 반도 못 먹어요. 사람들 앞에서는 '열심히 사는 사람'처럼 보이는 것 같은데, 사실은 비효율적이고 충동적인 결정을 자주 해요. 그냥 좀 엉성한 사람이에요.`,
    3: `누군가와 '아, 나도 그랬어'가 자연스럽게 나올 때 연결됐다는 느낌이 들어요. 말의 내용보다 그 뒤에 오는 침묵이 불편하지 않을 때요. 외로움은 오히려 친한 친구들 사이에서 느꼈어요. 다들 웃고 있는데 '이 사람들은 내가 요즘 어떤 생각을 하는지 전혀 모르겠구나' 싶었을 때, 그 거리감이 생각보다 컸어요.`,
    4: `일단 내 의견을 먼저 말하고 싶은 충동을 참으려고 해요. 그 사람이 왜 그렇게 생각하게 됐는지 맥락이 궁금해서 질문을 먼저 하는 편이에요. 그래도 도저히 납득이 안 되는 부분이 있으면 '저는 다르게 생각해요'라고 말하되, 굳이 설득하려 들지는 않아요. 생각이 다른 것과 틀린 건 다르니까요.`,
    5: `알랭 드 보통의 책에서 읽은 '불안은 사랑받고 싶은 마음이다'라는 문장이요. 그때 저는 발표나 평가받는 상황이 너무 두려웠는데, 그게 단순히 실패에 대한 두려움이 아니라 '인정받고 싶다'는 마음에서 온다는 걸 깨달았어요. 그 이후로 스스로한테 좀 더 너그러워졌어요. 잘하고 싶은 건 나쁜 게 아니니까요.`,
    6: `'있으면 좋은 사람'이요. 화려하거나 재밌는 사람이 아니어도 괜찮아요. 8주 동안 이 공간에서 솔직하게 있었던 사람, 남의 이야기를 진짜로 들어준 사람으로 기억됐으면 해요. 나중에 각자 흩어졌을 때도 '그 사람, 따뜻했는데' 정도로 기억되면 충분할 것 같아요.`,
  }

  function toggleExample(q: number) {
    setExampleVisible(prev => prev === q ? null : q)
  }

  function showStep(step: number) {
    setCurrentStep(step)
    trackCustom("신청폼_단계이동", { 단계: step, 폼: "독서모임_신청" })
    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  function validateStep(step: number): boolean {
    const form = document.getElementById("applicationForm") as HTMLFormElement
    if (!form) return false

    if (step === 1) {
      const name = form.querySelector<HTMLInputElement>('input[name="name"]')
      const gender = form.querySelectorAll<HTMLInputElement>('input[name="gender"]')
      const age = form.querySelector<HTMLInputElement>('input[name="age"]')
      const phone = form.querySelector<HTMLInputElement>('input[name="phone"]')
      const job = form.querySelector<HTMLInputElement>('input[name="job"]')

      if (!name?.value.trim()) { alert("이름을 입력해주세요."); name?.focus(); return false }
      if (!Array.from(gender).some(r => r.checked)) { alert("성별을 선택해주세요."); return false }
      if (!age?.value.trim()) { alert("나이를 입력해주세요."); age?.focus(); return false }
      if (!phone?.value.trim()) { alert("전화번호를 입력해주세요."); phone?.focus(); return false }
      if (!job?.value.trim()) { alert("직업을 입력해주세요."); job?.focus(); return false }
    }

    if (step === 2) {
      const experience = form.querySelectorAll<HTMLInputElement>('input[name="experience"]')
      const howFound = form.querySelectorAll<HTMLInputElement>('input[name="how_found"]')
      if (!Array.from(experience).some(r => r.checked)) { alert("독서모임 참여 경험을 선택해주세요."); return false }
      if (!Array.from(howFound).some(r => r.checked)) { alert("알게 된 경로를 선택해주세요."); return false }
      if (selectedSchedules.length === 0) { alert("희망하는 모임 시간대를 선택해주세요."); return false }
    }

    if (step === 3) {
      const q1 = form.querySelector<HTMLTextAreaElement>('textarea[name="q1"]')
      const q2 = form.querySelector<HTMLTextAreaElement>('textarea[name="q2"]')
      const q3 = form.querySelector<HTMLTextAreaElement>('textarea[name="q3"]')
      const q4 = form.querySelector<HTMLTextAreaElement>('textarea[name="q4"]')
      const q5 = form.querySelector<HTMLTextAreaElement>('textarea[name="q5"]')
      const q6 = form.querySelector<HTMLTextAreaElement>('textarea[name="q6"]')
      const privacy = form.querySelector<HTMLInputElement>('input[name="privacy_agree"]')

      if (!q1?.value.trim()) { alert("1번 질문에 답변해주세요."); q1?.focus(); return false }
      if (!q2?.value.trim()) { alert("2번 질문에 답변해주세요."); q2?.focus(); return false }
      if (!q3?.value.trim()) { alert("3번 질문에 답변해주세요."); q3?.focus(); return false }
      if (!q4?.value.trim()) { alert("4번 질문에 답변해주세요."); q4?.focus(); return false }
      if (!q5?.value.trim()) { alert("5번 질문에 답변해주세요."); q5?.focus(); return false }
      if (!q6?.value.trim()) { alert("6번 질문에 답변해주세요."); q6?.focus(); return false }
      if (!privacy?.checked) { alert("개인정보 수집 및 이용에 동의해주세요."); return false }
    }

    return true
  }

  function formatPhone(value: string) {
    const nums = value.replace(/[^0-9]/g, "")
    if (nums.length <= 3) return nums
    if (nums.length <= 7) return nums.slice(0, 3) + "-" + nums.slice(3)
    return nums.slice(0, 3) + "-" + nums.slice(3, 7) + "-" + nums.slice(7, 11)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validateStep(3)) return

    setLoading(true)
    const form = e.currentTarget

    const payload = {
      name: form.querySelector<HTMLInputElement>('input[name="name"]')?.value,
      gender: form.querySelector<HTMLInputElement>('input[name="gender"]:checked')?.value,
      age: form.querySelector<HTMLInputElement>('input[name="age"]')?.value,
      phone: form.querySelector<HTMLInputElement>('input[name="phone"]')?.value,
      job: form.querySelector<HTMLInputElement>('input[name="job"]')?.value,
      experience: form.querySelector<HTMLInputElement>('input[name="experience"]:checked')?.value,
      how_found: form.querySelector<HTMLInputElement>('input[name="how_found"]:checked')?.value,
      how_found_etc: form.querySelector<HTMLInputElement>('input[name="how_found_etc"]')?.value || "",
      schedule: selectedSchedules,
      q1: form.querySelector<HTMLTextAreaElement>('textarea[name="q1"]')?.value,
      q2: form.querySelector<HTMLTextAreaElement>('textarea[name="q2"]')?.value,
      q3: form.querySelector<HTMLTextAreaElement>('textarea[name="q3"]')?.value,
      q4: form.querySelector<HTMLTextAreaElement>('textarea[name="q4"]')?.value,
      q5: form.querySelector<HTMLTextAreaElement>('textarea[name="q5"]')?.value,
      q6: form.querySelector<HTMLTextAreaElement>('textarea[name="q6"]')?.value,
      privacy_agree: form.querySelector<HTMLInputElement>('input[name="privacy_agree"]')?.checked,
    }

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwXGc1bvi5HKmfKGC-ndELOL3_DcqLO46XK6NZA6GbEM5ZoK1endT5LDIcIzOGfl_0/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      trackStandard("CompleteRegistration", { content_name: "독서모임_신청완료" })
      trackStandard("Lead", { content_name: "독서모임_신청완료" })
      alert("신청이 완료되었습니다!\n\n운영진 검토 후 개별 연락드리겠습니다.")
      window.location.replace("https://buy.tosspayments.com/products/ihBnIOCGdY?shopId=prreBmgHJwPY")
    } catch {
      alert("전송 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const scheduleOptions = [
    {
      label: "목요일",
      time: "19:30 – 22:30",
      datesA: "3/12, 3/26, 4/9, 4/23",
      datesB: "3/19, 4/2, 4/16, 4/30",
    },
    {
      label: "일요일 오전",
      time: "10:30 – 13:30",
      datesA: "3/8, 3/22, 4/5, 4/19",
      datesB: "3/15, 3/29, 4/12, 4/26",
    },
    {
      label: "일요일 오후",
      time: "14:30 – 17:30",
      datesA: "3/8, 3/22, 4/5, 4/19",
      datesB: "3/15, 3/29, 4/12, 4/26",
    },
  ]

  const [howFoundEtc, setHowFoundEtc] = useState(false)

  return (
    <>
      <section className={styles.application} id="apply">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>APPLY NOW</div>
            <h2 className={styles.sectionTitle}>Lazy Day Book Club</h2>
            <div className={styles.noticeBox}>
              <p className={styles.noticeTitle}>[레이지데이 북클럽]</p>
              <p className={styles.noticeText}>
                이 질문들은 정답이 없습니다.<br />
                작성해주신 소중한 답변은 운영진만 확인하며,<br />
                여러분의 진솔한 이야기는 건강한 북클럽 커뮤니티를 만드는 첫걸음이 됩니다.
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className={styles.formProgress}>
            {[1, 2, 3].map(step => (
              <div
                key={step}
                className={`${styles.progressStep} ${currentStep === step ? styles.active : ""} ${currentStep > step ? styles.completed : ""}`}
              >
                <div className={styles.progressNumber}>{step}</div>
                <div className={styles.progressLabel}>
                  {step === 1 ? "개인정보" : step === 2 ? "독서모임" : "당신의 문장"}
                </div>
              </div>
            ))}
          </div>

          <form className={styles.applicationForm} id="applicationForm" onSubmit={handleSubmit}>
            {/* Step 1: 개인정보 */}
            <div className={`${styles.formStep} ${currentStep === 1 ? styles.active : ""}`}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>이름 *</label>
                <input type="text" name="name" className={styles.formInput} required placeholder="홍길동" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>성별 *</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="gender" value="남성" required />
                    <span className={styles.radioText}>남성</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="gender" value="여성" required />
                    <span className={styles.radioText}>여성</span>
                  </label>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>나이 *</label>
                <input
                  type="number"
                  name="age"
                  className={styles.formInput}
                  required
                  placeholder="예: 28"
                  min={1}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>전화번호 *</label>
                <input
                  type="tel"
                  name="phone"
                  className={styles.formInput}
                  required
                  placeholder="010-1234-5678"
                  onChange={e => { e.target.value = formatPhone(e.target.value) }}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>직업 *</label>
                <input type="text" name="job" className={styles.formInput} required placeholder="예: 마케터, 개발자 등" />
              </div>
              <button
                type="button"
                className={styles.submitButton}
                onClick={() => { if (validateStep(1)) showStep(2) }}
              >
                다음 단계
              </button>
            </div>

            {/* Step 2: 독서모임 */}
            <div className={`${styles.formStep} ${currentStep === 2 ? styles.active : ""}`}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>독서모임에 참여해본 경험이 있나요? *</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="experience" value="있음" required />
                    <span className={styles.radioText}>있어요</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="experience" value="없음" required />
                    <span className={styles.radioText}>없어요</span>
                  </label>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>레이지데이 북클럽을 어떻게 알게 되셨나요? *</label>
                <div className={styles.radioGroupColumn}>
                  {["인스타그램", "지인추천", "링키라운지 프로그램"].map(option => (
                    <label key={option} className={styles.radioLabelFull}>
                      <input
                        type="radio"
                        name="how_found"
                        value={option}
                        onChange={() => setHowFoundEtc(false)}
                      />
                      <span className={styles.radioText}>{option}</span>
                    </label>
                  ))}
                  <label className={styles.radioLabelFull}>
                    <input
                      type="radio"
                      name="how_found"
                      value="기타"
                      onChange={() => setHowFoundEtc(true)}
                    />
                    <span className={styles.radioText}>기타</span>
                  </label>
                  {howFoundEtc && (
                    <input
                      type="text"
                      name="how_found_etc"
                      className={`${styles.formInput} ${styles.etcInput}`}
                      placeholder="어떻게 알게 되셨나요?"
                    />
                  )}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>희망하는 모임 요일을 선택해주세요. *</label>
                <div className={styles.formNote} style={{ marginBottom: 12 }}>A/B반 배정은 운영진이 진행합니다. 복수 선택 가능합니다.</div>
                <div className={styles.scheduleOptions}>
                  {scheduleOptions.map(({ label, time, datesA, datesB }) => (
                    <label key={label} className={styles.scheduleLabel}>
                      <input
                        type="checkbox"
                        name="schedule"
                        value={label}
                        checked={selectedSchedules.includes(label)}
                        onChange={(e) => {
                          setSelectedSchedules(prev =>
                            e.target.checked ? [...prev, label] : prev.filter(s => s !== label)
                          )
                        }}
                      />
                      <div className={styles.scheduleLabelContent}>
                        <span className={styles.scheduleDay}>{label}</span>
                        <span className={styles.scheduleTime}>{time}</span>
                        <span className={styles.scheduleDates}>A반 {datesA}</span>
                        <span className={styles.scheduleDates}>B반 {datesB}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.formButtons}>
                <button type="button" className={styles.btnPrevious} onClick={() => showStep(1)}>이전</button>
                <button type="button" className={styles.btnNext} onClick={() => { if (validateStep(2)) showStep(3) }}>다음 단계</button>
              </div>
            </div>

            {/* Step 3: 당신의 문장 */}
            <div className={`${styles.formStep} ${currentStep === 3 ? styles.active : ""}`}>
              <div className={styles.questionNote}>
                아래 질문들은 정답이 없습니다.<br />
                당신의 진솔한 이야기를 들려주세요.
              </div>

              {([
                { q: 1, name: "q1", label: "요즘 당신의 마음을 가장 오랫동안 머물게 하는 단어(또는 문장)는 무엇인가요? 그 이유와 함께 들려주세요. *", placeholder: "요즘 자꾸 떠오르는 말, 마음에 걸리는 생각, 어떤 것이든 좋아요. (200자 이상 권장)" },
                { q: 2, name: "q2", label: "타인에게 보여지는 모습이 아닌, 혼자 있을 때 마주하는 '진짜 나'는 어떤 사람인가요? *", placeholder: "장점이나 성과가 아닌, 자신의 서툰 면이나 솔직한 기질에 대해 써주셔도 좋습니다. 솔직할수록 좋아요. (200자 이상 권장)" },
                { q: 3, name: "q3", label: "타인과 '연결되었다'고 느끼는 순간은 언제인가요? 반대로, 사람들 속에 있어도 지독한 외로움을 느꼈던 경험이 있다면 무엇 때문이었나요? *", placeholder: "관계에서 느꼈던 진짜 감정을 꺼내주세요. 피상적이지 않아도 괜찮아요. (200자 이상 권장)" },
                { q: 4, name: "q4", label: "나와 가치관이나 생각이 전혀 다른 사람과 대화할 때, 주로 어떤 태도를 취하나요? 본인만의 경청 방식이나 갈등을 대하는 철학을 포함해주세요. *", placeholder: "실제 경험을 바탕으로 적어주시면 더 좋아요. (200자 이상 권장)" },
                { q: 5, name: "q5", label: "책 속의 문장이 실제 삶이나 태도를 바꿨던 구체적인 경험이 있나요? 있다면 어떤 변화였나요? *", placeholder: "책이 아니어도 괜찮아요. 어떤 말이나 글귀가 나를 바꿨던 경험이라면 뭐든 좋아요. (200자 이상 권장)" },
                { q: 6, name: "q6", label: "우리 북클럽은 8주간의 여정 끝에 '사람'이 남기를 희망합니다. 당신은 함께할 멤버들에게 어떤 '사람'으로 기억되고 싶으신가요? *", placeholder: "거창하지 않아도 좋아요. 이 모임에서 어떤 사람이고 싶은지 솔직하게 적어주세요. (200자 이상 권장)" },
              ] as const).map(({ q, name, label, placeholder }) => (
                <div key={q} className={styles.formGroup}>
                  <div className={styles.labelRow}>
                    <label className={styles.formLabel}>
                      <span className={styles.questionNumber}>Q{q}.</span>
                      {label}
                    </label>
                    <button
                      type="button"
                      className={`${styles.exampleBtn} ${exampleVisible === q ? styles.exampleBtnActive : ""}`}
                      onClick={() => toggleExample(q)}
                    >
                      {exampleVisible === q ? "닫기" : "예시보기"}
                    </button>
                  </div>
                  {exampleVisible === q && (
                    <div className={styles.exampleBox}>
                      <div className={styles.exampleBadge}>예시 답변</div>
                      <p className={styles.exampleText}>{examples[q]}</p>
                      <button
                        type="button"
                        className={styles.exampleCloseBtn}
                        onClick={() => setExampleVisible(null)}
                      >
                        확인, 내 이야기를 쓸게요
                      </button>
                    </div>
                  )}
                  <textarea name={name} className={`${styles.formInput} ${styles.textareaResize}`} required rows={4} placeholder={placeholder} />
                </div>
              ))}

              <div className={`${styles.formGroup} ${styles.formPrivacySection}`}>
                <label className={styles.formCheckboxLabel}>
                  <input type="checkbox" name="privacy_agree" required />
                  <span>개인정보 수집 및 이용에 동의합니다. *</span>
                </label>
                <div className={styles.formPrivacyNotice}>
                  작성해주신 소중한 답변은 운영진만 확인하며, 멤버 선정 외의 용도로는 절대 사용되지 않습니다.<br />
                  선정된 분들께는 개별 연락 드리겠습니다.
                </div>
              </div>

              <div className={styles.formButtons}>
                <button type="button" className={styles.btnPrevious} onClick={() => showStep(2)}>이전</button>
                <button type="submit" className={styles.btnNext} disabled={loading}>신청 완료하기</button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Loading Overlay */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner} />
            <p className={styles.loadingText}>신청 중입니다...</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div>
              <div className={styles.footerLogo}>LINKY LOUNGE</div>
              <div className={styles.footerInfo}>
                <p>주식회사 링키</p>
                <p>대표 : 안동민 | 개인정보관리책임자 : 안동민</p>
                <p>사업자등록번호 : 557-81-03588</p>
                <p>이메일 : linkylounge@gmail.com | 대표번호 : 010-7444-5790</p>
                <p>주소: 경기도 남양주시 별내3로 322, 404호</p>
              </div>
            </div>
            <div className={styles.footerLinks}>
              <a href="https://www.instagram.com/linky_lounge/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Instagram</a>
              <a href="https://naver.me/F4LgLoQx" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>오시는 길</a>
              <a href="https://www.instagram.com/linky_lounge/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>문의하기</a>
              <a href="https://linky-korea.vercel.app/lounge/policy?type=study" className={styles.footerLink}>교환환불정책</a>
            </div>
          </div>
          <p className={styles.footerCopyright}>
            &copy; 2025 Linky Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
