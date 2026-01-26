import { Link } from "lucide-react";
import { Section } from "./section";
import { SubSection } from "./sub-section";
import { Highlight } from "./highlight";
import { Table } from "./table";

export function PrivacyContents() {
	return (
		<div className="max-w-[800px] mx-auto px-5 py-[60px]">
        
        <div className="mt-10 mb-10 pb-5 border-b-2 border-[--primary]">
          <h1 className="text-4xl font-bold text-[--black] mb-2.5">
            개인정보처리방침
          </h1>
        </div>
        
        <div className="bg-white rounded-xl p-10 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
          {/* 제1조 총칙 */}
          <Section title="제1조 (총칙)">
            <p>
              주식회사 링키(이하 &ldquo;회사&rdquo;)는 이용자의 개인정보를 매우 중요하게 생각하며, 
              「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하고 있습니다.
            </p>
            <p>
              본 개인정보처리방침은 회사가 제공하는 링키(Linky) 서비스(이하 &ldquo;서비스&rdquo;)에 적용되며, 
              다음과 같은 내용을 포함합니다.
            </p>
          </Section>

          {/* 제2조 수집하는 개인정보 */}
          <Section title="제2조 (수집하는 개인정보의 항목)">
            <SubSection title="1. 회원가입 시 수집항목">
              <ul>
                <li><strong>필수항목:</strong> 이메일 주소, 비밀번호, 이름, 휴대전화번호, 생년월일</li>
                <li><strong>선택항목:</strong> 프로필 사진, 주소, 성별</li>
                <li><strong>사업자 회원:</strong> 사업자등록번호, 대표자명, 사업장 주소, 업종</li>
              </ul>
            </SubSection>

            <SubSection title="2. 서비스 이용 과정에서 수집되는 정보">
              <ul>
                <li>서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                <li>기기정보(OS, 브라우저 타입, 디바이스 ID)</li>
                <li>위치정보(근로자 매칭 시, 동의한 경우에 한함)</li>
                <li>결제정보(신용카드번호, 계좌번호 등)</li>
              </ul>
            </SubSection>

            <SubSection title="3. 근로자 인증 시 추가 수집항목">
              <ul>
                <li>신분증 사본(주민등록번호 뒷자리 마스킹)</li>
                <li>계좌정보(급여 지급용)</li>
                <li>4대보험 가입정보</li>
                <li>건강상태 자가진단 정보</li>
              </ul>
            </SubSection>
          </Section>

          {/* 제3조 개인정보 수집 방법 */}
          <Section title="제3조 (개인정보의 수집 방법)">
            <p>회사는 다음과 같은 방법으로 개인정보를 수집합니다:</p>
            <ul>
              <li>홈페이지, 모바일 앱을 통한 회원가입</li>
              <li>서비스 이용 과정에서 자동으로 생성되는 정보 수집</li>
              <li>고객센터를 통한 상담 과정</li>
              <li>제휴사로부터의 제공</li>
              <li>생성정보 수집 도구를 통한 자동 수집</li>
            </ul>
          </Section>

          {/* 제4조 개인정보의 이용목적 */}
          <Section title="제4조 (개인정보의 수집 및 이용목적)">
            <SubSection title="1. 서비스 제공에 관한 계약 이행 및 서비스 제공">
              <ul>
                <li>무인공간 운영자와 근로자 간 실시간 매칭</li>
                <li>AI 기반 작업 가이드 제공</li>
                <li>근무 이력 관리 및 증빙 서류 발급</li>
                <li>급여 정산 및 지급</li>
              </ul>
            </SubSection>

            <SubSection title="2. 회원 관리">
              <ul>
                <li>회원제 서비스 이용에 따른 본인확인, 개인식별</li>
                <li>불량회원의 부정 이용 방지와 비인가 사용 방지</li>
                <li>가입 의사 확인, 연령 확인</li>
                <li>분쟁 조정을 위한 기록 보존</li>
                <li>불만처리 등 민원처리, 고지사항 전달</li>
              </ul>
            </SubSection>

            <SubSection title="3. 마케팅 및 광고에의 활용">
              <ul>
                <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
                <li>이벤트 및 광고성 정보 제공 및 참여기회 제공</li>
                <li>인구통계학적 특성에 따른 서비스 제공</li>
                <li>서비스의 유효성 확인, 접속빈도 파악</li>
              </ul>
            </SubSection>
          </Section>

          {/* 제5조 개인정보의 보유 및 이용기간 */}
          <Section title="제5조 (개인정보의 보유 및 이용기간)">
            <p>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 
              개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            
            <Highlight>
              <SubSection title="회원정보">
                <p><strong>보유기간:</strong> 회원 탈퇴 시까지</p>
                <p>
                  <strong>단,</strong> 관계법령의 규정에 의하여 보존할 필요가 있는 경우 
                  해당 법령에서 정한 기간 동안 보관합니다.
                </p>
              </SubSection>
            </Highlight>

            <SubSection title="관계법령에 의한 정보보유 사유">
              <Table>
                <thead>
                  <tr>
                    <th className='border border-[--linky-border]'>보유 정보</th>
                    <th className='border border-[--linky-border]'>보유 기간</th>
                    <th className='border border-[--linky-border]'>관련 법령</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border border-[--linky-border]'>계약 또는 청약철회 등에 관한 기록</td>
                    <td className='border border-[--linky-border]'>5년</td>
                    <td className='border border-[--linky-border]'>전자상거래법</td>
                  </tr>
                  <tr>
                    <td className='border border-[--linky-border]'>대금결제 및 재화 등의 공급에 관한 기록</td>
                    <td className='border border-[--linky-border]'>5년</td>
                    <td className='border border-[--linky-border]'>전자상거래법</td>
                  </tr>
                  <tr>
                    <td className='border border-[--linky-border]'>소비자의 불만 또는 분쟁처리에 관한 기록</td>
                    <td className='border border-[--linky-border]'>3년</td>
                    <td className='border border-[--linky-border]'>전자상거래법</td>
                  </tr>
                  <tr>
                    <td className='border border-[--linky-border]'>근로계약서, 임금대장</td>
                    <td className='border border-[--linky-border]'>3년</td>
                    <td className='border border-[--linky-border]'>근로기준법</td>
                  </tr>
                  <tr>
                    <td className='border border-[--linky-border]'>웹사이트 방문기록</td>
                    <td className='border border-[--linky-border]'>3개월</td>
                    <td className='border border-[--linky-border]'>통신비밀보호법</td>
                  </tr>
                </tbody>
              </Table>
            </SubSection>
          </Section>

          {/* 제6조 개인정보의 제3자 제공 */}
          <Section title="제6조 (개인정보의 제3자 제공)">
            <p>
              회사는 원칙적으로 이용자의 개인정보를 제1조에서 명시한 범위 내에서 처리하며, 
              이용자의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다.
            </p>
            
            <p>다만, 다음의 경우에는 예외로 합니다:</p>
            <ul>
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              <li>통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우</li>
            </ul>

            <SubSection title="서비스 제공을 위한 제3자 제공 현황">
              <Table>
                <thead>
                  <tr>
                    <th className='border border-[--linky-border]'>제공받는 자</th>
                    <th className='border border-[--linky-border]'>제공 목적</th>
                    <th className='border border-[--linky-border]'>제공 항목</th>
                    <th className='border border-[--linky-border]'>보유기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border border-[--linky-border]'>무인공간 운영자</td>
                    <td className='border border-[--linky-border]'>근로자 매칭</td>
                    <td className='border border-[--linky-border]'>이름, 연락처, 평점</td>
                    <td className='border border-[--linky-border]'>매칭 종료 후 1년</td>
                  </tr>
                  <tr>
                    <td className='border border-[--linky-border]'>PG사(결제대행업체)</td>
                    <td className='border border-[--linky-border]'>결제 처리</td>
                    <td className='border border-[--linky-border]'>결제정보</td>
                    <td className='border border-[--linky-border]'>거래 종료 후 5년</td>
                  </tr>
                  <tr>
                    <td className='border border-[--linky-border]'>보험회사</td>
                    <td className='border border-[--linky-border]'>산재보험 가입</td>
                    <td className='border border-[--linky-border]'>이름, 생년월일, 근무정보</td>
                    <td className='border border-[--linky-border]'>보험 종료 후 5년</td>
                  </tr>
                </tbody>
              </Table>
            </SubSection>
          </Section>

          {/* 추가 조항들 */}
          <Section title="제7조 (개인정보 처리의 위탁)">
            <p>
              회사는 서비스 향상을 위해 다음과 같이 개인정보를 위탁하고 있으며, 
              관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
            </p>
            
            <Table>
              <thead className='border border-[--linky-border]'>
                <tr>
                  <th className='border border-[--linky-border]'>수탁업체</th>
                  <th className='border border-[--linky-border]'>위탁업무 내용</th>
                  <th className='border border-[--linky-border]'>보유 및 이용기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border border-[--linky-border]'>Amazon Web Services</td>
                  <td className='border border-[--linky-border]'>데이터 보관 및 서버 운영</td>
                  <td className='border border-[--linky-border]'>회원탈퇴 시 또는 위탁계약 종료 시</td>
                </tr>
                <tr>
                  <td className='border border-[--linky-border]'>Supabase</td>
                  <td className='border border-[--linky-border]'>데이터베이스 관리</td>
                  <td className='border border-[--linky-border]'>회원탈퇴 시 또는 위탁계약 종료 시</td>
                </tr>
                <tr>
                  <td className='border border-[--linky-border]'>카카오</td>
                  <td className='border border-[--linky-border]'>알림톡 발송</td>
                  <td className='border border-[--linky-border]'>회원탈퇴 시 또는 위탁계약 종료 시</td>
                </tr>
                <tr>
                  <td className='border border-[--linky-border]'>NICE평가정보</td>
                  <td className='border border-[--linky-border]'>본인인증</td>
                  <td className='border border-[--linky-border]'>인증 완료 후 6개월</td>
                </tr>
              </tbody>
            </Table>
          </Section>
        </div>
      </div>
	)
}