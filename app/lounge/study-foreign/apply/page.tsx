"use client"

import { useState, type FormEvent } from "react"
import { trackStandard, trackCustom } from "@/lib/meta-pixel"
import styles from "./page.module.css"

export default function StudyForeignApplyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [charCount, setCharCount] = useState(0)
  const [loading, setLoading] = useState(false)

  function showStep(step: number) {
    setCurrentStep(step)
    trackCustom("FormStep", { step, form: "study_foreign_apply" })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function validateStep(step: number): boolean {
    const form = document.getElementById("applicationForm") as HTMLFormElement
    if (!form) return false

    if (step === 1) {
      const name = form.querySelector<HTMLInputElement>('input[name="name"]')
      const gender = form.querySelectorAll<HTMLInputElement>('input[name="gender"]')
      const age = form.querySelector<HTMLInputElement>('input[name="age"]')
      const phone = form.querySelector<HTMLInputElement>('input[name="phone"]')
      const intro = form.querySelector<HTMLTextAreaElement>('textarea[name="introduction"]')

      if (!name?.value.trim()) { alert("이름을 입력해주세요."); name?.focus(); return false }
      if (!Array.from(gender).some(r => r.checked)) { alert("성별을 선택해주세요."); return false }
      const ageVal = Number(age?.value)
      if (isNaN(ageVal) || ageVal < 19 || ageVal > 39) { alert("만 19세 ~ 39세만 신청이 가능합니다."); age?.focus(); return false }
      if (!phone?.value.trim()) { alert("연락처를 입력해주세요."); phone?.focus(); return false }
      if (!intro?.value.trim()) { alert("자기소개를 입력해주세요."); intro?.focus(); return false }
    }

    if (step === 2) {
      const month = form.querySelectorAll<HTMLInputElement>('input[name="month"]')
      const language = form.querySelectorAll<HTMLInputElement>('input[name="language"]')
      const cls = form.querySelectorAll<HTMLInputElement>('input[name="class"]')
      const level = form.querySelectorAll<HTMLInputElement>('input[name="level"]')

      if (!Array.from(month).some(r => r.checked)) { alert("희망 수강 월을 선택해주세요."); return false }
      if (!Array.from(language).some(r => r.checked)) { alert("희망 언어를 선택해주세요."); return false }
      if (!Array.from(cls).some(r => r.checked)) { alert("희망 반을 선택해주세요."); return false }
      if (!Array.from(level).some(r => r.checked)) { alert("회화 수준을 선택해주세요."); return false }
    }

    if (step === 3) {
      const privacy = form.querySelector<HTMLInputElement>('input[name="privacy_agree"]')
      const photo = form.querySelector<HTMLInputElement>('input[name="photo_agree"]')
      if (!privacy?.checked || !photo?.checked) { alert("필수 동의 항목을 모두 체크해주세요."); return false }
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
      name: (form.querySelector<HTMLInputElement>('input[name="name"]'))?.value,
      month: (form.querySelector<HTMLInputElement>('input[name="month"]:checked'))?.value,
      language: (form.querySelector<HTMLInputElement>('input[name="language"]:checked'))?.value,
      class: (form.querySelector<HTMLInputElement>('input[name="class"]:checked'))?.value,
      level: (form.querySelector<HTMLInputElement>('input[name="level"]:checked'))?.value,
      gender: (form.querySelector<HTMLInputElement>('input[name="gender"]:checked'))?.value,
      age: (form.querySelector<HTMLInputElement>('input[name="age"]'))?.value,
      phone: (form.querySelector<HTMLInputElement>('input[name="phone"]'))?.value,
      job: (form.querySelector<HTMLInputElement>('input[name="job"]'))?.value || "",
      instagram: (form.querySelector<HTMLInputElement>('input[name="instagram"]'))?.value || "",
      introduction: (form.querySelector<HTMLTextAreaElement>('textarea[name="introduction"]'))?.value,
      source: (form.querySelector<HTMLSelectElement>('select[name="source"]'))?.value || "",
      referrer: (form.querySelector<HTMLInputElement>('input[name="referrer"]'))?.value || "",
      privacy_agree: (form.querySelector<HTMLInputElement>('input[name="privacy_agree"]'))?.checked,
      photo_agree: (form.querySelector<HTMLInputElement>('input[name="photo_agree"]'))?.checked,
    }

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyZ-5ra8NLj3CaPmcyIc3yMk3BoTX-t2DFBP0qlhJEP1Ek6C14uw4nP-8vFDKU30Wo/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      trackStandard("CompleteRegistration", { content_name: "study_foreign_apply" })
      trackStandard("Lead", { content_name: "study_foreign_apply" })
      alert("신청이 완료되었습니다!")
      window.location.replace("https://buy.tosspayments.com/products/SCBnFcyXiE?shopId=prreBmgHJwPY")
    } catch {
      alert("전송 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className={styles.application} id="apply">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>APPLY NOW</div>
            <h2 className={styles.sectionTitle}>회화 입문 모집</h2>
            <p className={styles.sectionDescription}>
              나랑 회화 배울 사람!<br />
              회화를 입문하고 싶은 분들을 모집합니다!<br />
              <strong>2026년 3월 일본어/중국어 회화를 입문하고 싶은 분들을 모집합니다!</strong>
            </p>
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
                  {step === 1 ? "신청자 정보" : step === 2 ? "수강 정보" : "추가 & 동의"}
                </div>
              </div>
            ))}
          </div>

          <form className={styles.applicationForm} id="applicationForm" onSubmit={handleSubmit}>
            {/* Step 1 */}
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
                <label className={styles.formLabel}>나이 (만) *</label>
                <input type="number" name="age" className={styles.formInput} required placeholder="예: 28" min={19} max={35} />
                <div className={styles.formNote}>만 19세 ~ 39세</div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>연락처 *</label>
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
                <label className={styles.formLabel}>자기소개 및 신청 계기 (200자 이하) *</label>
                <textarea
                  name="introduction"
                  className={`${styles.formInput} ${styles.textareaResize}`}
                  required
                  placeholder="학습 동기, 목표, 신청 계기 등을 작성해주세요"
                  maxLength={200}
                  rows={4}
                  onChange={e => setCharCount(e.target.value.length)}
                />
                <div className={styles.charCounter}>
                  <span>{charCount}</span> / 200자
                </div>
              </div>
              <button
                type="button"
                className={styles.submitButton}
                onClick={() => { if (validateStep(1)) showStep(2) }}
              >
                다음 단계
              </button>
            </div>

            {/* Step 2 */}
            <div className={`${styles.formStep} ${currentStep === 2 ? styles.active : ""}`}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>희망 수강 월 선택 *</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="month" value="3월" required />
                    <span className={styles.radioText}>3월</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="month" value="4월" required />
                    <span className={styles.radioText}>4월</span>
                  </label>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>희망 수강 언어 선택 (언어별 요일 상이) *</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="language" value="일본어" required />
                    <span className={styles.radioText}>일본어 (매주 월요일)</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="language" value="중국어" required />
                    <span className={styles.radioText}>중국어 (매주 화요일)</span>
                  </label>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>희망 반 선택 *</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="class" value="A반 (19:00~20:30)" required />
                    <span className={styles.radioText}>A반 (19:00~20:30)</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="class" value="B반 (21:00~22:30)" required />
                    <span className={styles.radioText}>B반 (21:00~22:30)</span>
                  </label>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>회화 수준 선택 *</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="level" value="입문" required />
                    <span className={styles.radioText}>입문</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input type="radio" name="level" value="초급" required />
                    <span className={styles.radioText}>초급</span>
                  </label>
                </div>
              </div>
              <div className={styles.formButtons}>
                <button type="button" className={styles.btnPrevious} onClick={() => showStep(1)}>이전</button>
                <button type="button" className={styles.btnNext} onClick={() => { if (validateStep(2)) showStep(3) }}>다음 단계</button>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`${styles.formStep} ${currentStep === 3 ? styles.active : ""}`}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>직업 (선택)</label>
                <input type="text" name="job" className={styles.formInput} placeholder="예: 마케터, 개발자 등" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Instagram ID (선택)</label>
                <input type="text" name="instagram" className={styles.formInput} placeholder="@your_instagram_id" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>알게 된 경로 (선택)</label>
                <select name="source" className={styles.formInput}>
                  <option value="">선택해주세요</option>
                  <option value="Instagram">Instagram</option>
                  <option value="지인 추천">지인 추천</option>
                  <option value="검색">검색</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>추천인 (선택)</label>
                <input type="text" name="referrer" className={styles.formInput} placeholder="추천해주신 분의 성함" />
              </div>
              <div className={`${styles.formGroup} ${styles.formPrivacySection}`}>
                <label className={styles.formCheckboxLabel}>
                  <input type="checkbox" name="privacy_agree" required />
                  <span>개인정보 수집 및 이용에 동의합니다. *</span>
                </label>
                <label className={styles.formCheckboxLabel}>
                  <input type="checkbox" name="photo_agree" required />
                  <span>함께 나눈 순간을 남기기 위해 촬영을 진행하고 있으며, 촬영물은 링키라운지 인스타그램 또는 홈페이지 광고 등에 활용될 수 있음에 동의합니다. * <br />(공개를 원치 않는 경우, 신청 후 링키라운지 담당자에게 1:1 문의를 남겨주세요.)</span>
                </label>
                <div className={styles.formPrivacyNotice}>
                  신청자 개별 연락 예정<br />
                  <strong>비용: 10만원 (4주, 주 1회)</strong><br />
                  참가자로 선정된 분들은 결제 후 최종 참가 확정되며 조기 마감될 수 있습니다.
                </div>
              </div>
              <div className={styles.formButtons}>
                <button type="button" className={styles.btnPrevious} onClick={() => showStep(2)}>이전</button>
                <button type="submit" className={styles.btnNext}>신청 완료하기</button>
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
