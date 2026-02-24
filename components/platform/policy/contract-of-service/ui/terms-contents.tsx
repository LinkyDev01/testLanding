import { Link } from "lucide-react";
import { Section } from "./section";
import { SubSection } from "./sub-section";
import { Highlight } from "./highlight";
import { Table } from "./table";
import { TermDefinition } from "./term-definition";
import { Important } from "./important";

export function TermsContents() {
	return (
		<div className="max-w-[800px] mx-auto px-5 py-[60px]">

        <div className="mt-10 mb-10 pb-5 border-b-2 border-[--primary]">
          <h1 className="text-4xl font-bold text-[--black] mb-2.5">
            서비스 이용약관
          </h1>
        </div>
        
        <div className="bg-white rounded-xl p-10 shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
          {/* 제1장 총칙 */}
          <Section title="제1장 총칙">
            <SubSection title="제1조 (목적)">
              <p>
                이 약관은 주식회사 링키(이하 &ldquo;회사&rdquo;)가 운영하는 링키(Linky) 플랫폼(이하 &ldquo;플랫폼&rdquo;)에서 
                제공하는 무인공간 관리 중개 서비스(이하 &ldquo;서비스&rdquo;)의 이용조건 및 절차에 관한 기본적인 사항과 
                기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </SubSection>
            
            <SubSection title="제2조 (정의)">
              <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
              
              <TermDefinition term="플랫폼">
                회사가 운영하는 웹사이트(www.linkykorea.com) 및 모바일 애플리케이션을 말합니다.
              </TermDefinition>
              
              <TermDefinition term="서비스">
                무인공간 운영자와 단기 근로자를 실시간으로 매칭하고, AI 기반 작업 가이드를 제공하는 등 
                플랫폼을 통해 제공되는 모든 서비스를 말합니다.
              </TermDefinition>
              
              <TermDefinition term="회원">
                플랫폼에 회원등록을 한 개인 또는 법인으로서, 플랫폼의 정보를 지속적으로 제공받으며 
                서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </TermDefinition>
              
              <TermDefinition term="운영자 회원">
                무인공간을 운영하며 단기 근로자를 필요로 하는 회원을 말합니다.
              </TermDefinition>
              
              <TermDefinition term="파트너 회원">
                무인공간에서 단기 근로를 희망하는 개인 회원을 말합니다.
              </TermDefinition>
              
              <TermDefinition term="매칭">
                플랫폼을 통해 운영자 회원과 파트너 회원이 근로 계약을 체결하는 것을 말합니다.
              </TermDefinition>
              
              <TermDefinition term="AI 가이드">
                파트너 회원의 작업을 지원하기 위해 제공되는 인공지능 기반 작업 안내 시스템을 말합니다.
              </TermDefinition>
            </SubSection>

            <SubSection title="제3조 (약관의 게시와 개정)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  회사는 다음과 같은 서비스를 제공합니다:
                  <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                    <li>무인공간 운영자와 단기 근로자 간 실시간 매칭 서비스</li>
                    <li>AI 기반 작업 가이드 및 실시간 Q&A 서비스</li>
                    <li>근로 계약 체결 및 관리 서비스</li>
                    <li>급여 정산 및 지급 대행 서비스</li>
                    <li>근무 이력 관리 및 증빙 서류 발급 서비스</li>
                    <li>평점 및 리뷰 관리 서비스</li>
                    <li>보험 가입 지원 서비스</li>
                    <li>기타 플랫폼이 추가 개발하거나 제휴를 통해 회원에게 제공하는 일체의 서비스</li>
                  </ul>
                </li>
                <li>
                  서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 다만, 회사는 시스템 정기점검, 
                  증설 및 교체 등의 사유로 서비스를 일시적으로 중단할 수 있습니다.
                </li>
                <li>
                  회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 
                  정기점검시간은 서비스 제공화면에 공지한 바에 따릅니다.
                </li>
              </ol>
            </SubSection>

            <SubSection title="제9조 (서비스의 변경)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 
                  전부 또는 일부 서비스를 변경할 수 있습니다.
                </li>
                <li>
                  서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 
                  변경될 서비스의 내용 및 제공일자 등을 그 변경 전 7일 이상 플랫폼에 게시합니다.
                </li>
              </ol>
            </SubSection>

            <SubSection title="제10조 (서비스 이용료)">
              <ol className="list-decimal list-inside space-y-2">
                <li>플랫폼의 회원가입은 무료입니다.</li>
                <li>
                  회사는 매칭 성사 시 다음과 같은 수수료를 부과합니다:
                  <Table>
                    <thead>
                      <tr>
                        <th>구분</th>
                        <th>수수료율</th>
                        <th>부과 대상</th>
                        <th>결제 시점</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>운영자 회원</td>
                        <td>근로 대금의 15%</td>
                        <td>운영자</td>
                        <td>근로 완료 후</td>
                      </tr>
                      <tr>
                        <td>파트너 회원</td>
                        <td>근로 대금의 5%</td>
                        <td>파트너</td>
                        <td>급여 지급 시</td>
                      </tr>
                    </tbody>
                  </Table>
                </li>
                <li>
                  수수료율은 회사의 정책에 따라 변경될 수 있으며, 변경 시 30일 전에 공지합니다.
                </li>
                <li>프리미엄 서비스 이용 시 별도의 요금이 부과될 수 있습니다.</li>
              </ol>
            </SubSection>
          </Section>

          {/* 제4장 매칭 및 근로 계약 */}
          <Section title="제4장 매칭 및 근로 계약">
            <SubSection title="제11조 (매칭 신청 및 성사)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  운영자 회원은 플랫폼을 통해 필요한 인력의 조건을 명시하여 매칭을 요청할 수 있습니다.
                </li>
                <li>
                  파트너 회원은 자신의 조건에 맞는 근로 요청을 확인하고 수락할 수 있습니다.
                </li>
                <li>
                  매칭이 성사되면 양 당사자에게 알림이 발송되며, 근로 계약이 체결된 것으로 간주됩니다.
                </li>
                <li>
                  회사는 매칭의 중개자로서 근로 계약의 당사자가 아니며, 
                  근로 조건에 대한 직접적인 책임을 지지 않습니다.
                </li>
              </ol>
            </SubSection>

            <SubSection title="제12조 (근로 계약의 이행)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  파트너 회원은 약속된 시간과 장소에 출근하여 성실히 근로를 수행해야 합니다.
                </li>
                <li>
                  운영자 회원은 약속된 근로 조건을 준수하고 안전한 근로 환경을 제공해야 합니다.
                </li>
                <li>
                  양 당사자는 상호 존중하며 근로기준법 등 관련 법령을 준수해야 합니다.
                </li>
              </ol>
            </SubSection>

            <SubSection title="제13조 (근로 계약의 취소 및 변경)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  운영자 회원은 다음의 시한 내에서 근로 계약을 취소할 수 있습니다:
                  <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                    <li><strong>서비스 2일 전까지:</strong> 100% 환불</li>
                    <li><strong>서비스 24시간 전:</strong> 50% 환불 (수수료 50% 차감)</li>
                    <li><strong>서비스 15시간 전부터:</strong> 환불 불가</li>
                  </ul>
                </li>
                <li>
                  파트너 회원은 근로 예정일 1시간 전까지 취소할 수 있으며, 
                  이후 취소 시에는 위약금이 부과됩니다.
                </li>
                <li>
                  상호 합의 하에 근로 조건을 변경할 수 있으나, 
                  변경 사항은 플랫폼을 통해 기록되어야 합니다.
                </li>
                <li>
                  반복적인 취소나 무단 불참은 다른 회원들에게 피해를 주는 행위로, 엄격히 제재됩니다.
                </li>
              </ol>
            </SubSection>
          </Section>

          {/* 제5장 결제 및 환불 */}
          <Section title="제5장 결제 및 환불">
            <SubSection title="제14조 (결제)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  운영자 회원은 근로 완료 후 48시간 이내에 근로 대금과 수수료를 결제해야 합니다.
                </li>
                <li>
                  결제 수단은 다음과 같습니다:
                  <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                    <li>신용카드</li>
                    <li>체크카드</li>
                    <li>계좌이체</li>
                    <li>간편결제(카카오페이, 네이버페이 등)</li>
                    <li>링키 포인트</li>
                  </ul>
                </li>
                <li>결제 관련 정보는 암호화되어 안전하게 처리됩니다.</li>
              </ol>
            </SubSection>

            <SubSection title="제15조 (급여 지급)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  파트너 회원의 급여는 근로 완료 후 익일 지급을 원칙으로 합니다.
                </li>
                <li>급여는 파트너 회원이 등록한 계좌로 입금됩니다.</li>
                <li>
                  급여 지급 시 다음 항목이 공제됩니다:
                  <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                    <li>플랫폼 이용 수수료</li>
                    <li>원천징수세(해당하는 경우)</li>
                    <li>4대보험료(해당하는 경우)</li>
                  </ul>
                </li>
                <li>급여명세서는 플랫폼을 통해 확인 및 다운로드할 수 있습니다.</li>
              </ol>
            </SubSection>

            <SubSection title="제16조 (환불 정책 및 절차)">
              <Highlight>
                <h4 className="font-semibold mb-2">【 환불 시한 및 금액 】</h4>
                <p className="mb-2">환불 금액은 제13조의 취소 규정에 따라 다음과 같이 산정됩니다:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>서비스 2일 전까지:</strong> 100% 환불</li>
                  <li><strong>서비스 24시간 전:</strong> 50% 환불 (수수료 50% 차감)</li>
                  <li><strong>서비스 15시간 전부터:</strong> 환불 불가</li>
                </ul>
              </Highlight>

              <Highlight>
                <h4 className="font-semibold mb-2">【 긴급 옵션 환불 규정 】</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>24시간 내 긴급 요청 (10,000원):</strong> 상기 환불 규정 동일 적용</li>
                  <li><strong>4시간 내 초긴급 요청 (20,000원):</strong> 상기 환불 규정 동일 적용</li>
                </ul>
              </Highlight>

              <Highlight>
                <h4 className="font-semibold mb-2">【 서비스 품질 보증 및 환불 절차 】</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>서비스 미제공 또는 하자가 있는 경우 전액 환불이 가능합니다.</li>
                  <li>
                    서비스 완료 후 24시간 이내 이의제기 시 품질 미달 검토 후 
                    무상 재작업 또는 부분 환불 가능
                  </li>
                  <li>증빙자료(사진/동영상) 제출 필수</li>
                  <li>
                    환불 절차:
                    <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                      <li>1차: 고객센터 중재 (영업일 기준 3일 이내)</li>
                      <li>2차: 소비자보호원 신청 가능</li>
                      <li>환불 승인 시 7영업일 이내 원 결제수단으로 환불</li>
                    </ul>
                  </li>
                </ol>
              </Highlight>

              <Important>
                <h4 className="font-semibold mb-2">【 환불 불가 사항 】</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>고객 부재/연락두절로 인한 작업 불가</li>
                  <li>고객 요청으로 인한 추가 작업 (별도 요금 청구)</li>
                  <li>귀중품 분실 (당사 책임 없음 - 사전 보관 권고)</li>
                  <li>천재지변, 정부 규제 등 불가항력 (일정 조정 또는 100% 환불)</li>
                </ul>
              </Important>
            </SubSection>
          </Section>

          {/* 제6장 회원의 의무와 책임 */}
          <Section title="제6장 회원의 의무와 책임">
            <SubSection title="제17조 (회원의 ID 및 비밀번호에 대한 의무)">
              <ol className="list-decimal list-inside space-y-2">
                <li>ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.</li>
                <li>회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.</li>
                <li>
                  회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 
                  바로 회사에 통보하고 회사의 안내가 있는 경우에는 그에 따라야 합니다.
                </li>
              </ol>
            </SubSection>

            <SubSection title="제18조 (회원의 의무)">
              <p>회원은 다음 행위를 하여서는 안 됩니다:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>신청 또는 변경 시 허위 내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>플랫폼에 게시된 정보의 무단 변경</li>
                <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 플랫폼에 공개 또는 게시하는 행위</li>
                <li>플랫폼을 통해 구입한 재화 또는 용역을 영리목적으로 재판매하는 행위</li>
                <li>근로 현장에서의 폭력, 성희롱, 차별 등 인권 침해 행위</li>
                <li>허위 리뷰 작성, 평점 조작 등 플랫폼의 신뢰를 훼손하는 행위</li>
              </ol>
            </SubSection>
          </Section>

          {/* 제7장 책임제한 및 면책 */}
          <Section title="제7장 책임제한 및 면책">
            <SubSection title="제20조 (회사의 책임제한)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 
                  서비스 제공에 관한 책임이 면제됩니다.
                </li>
                <li>
                  회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
                </li>
                <li>
                  회사는 회원이 서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 
                  관하여는 책임을 지지 않습니다.
                </li>
                <li>
                  회사는 회원 간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 거래 등을 한 경우에는 
                  책임이 면제됩니다.
                </li>
                <li>
                  회사는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 
                  책임을 지지 않습니다.
                </li>
              </ol>
            </SubSection>

            <SubSection title="제21조 (플랫폼의 역할과 책임)">
              <Highlight>
                <p className="font-semibold">
                  중요: 회사는 운영자 회원과 파트너 회원 간의 근로 계약을 중개하는 플랫폼 제공자이며, 
                  근로 계약의 당사자가 아닙니다.
                </p>
              </Highlight>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  회사는 안전하고 신뢰할 수 있는 매칭 플랫폼을 제공하기 위해 최선을 다합니다.
                </li>
                <li>
                  회사는 회원 간 분쟁 발생 시 중재를 위해 노력하나, 
                  최종적인 책임은 당사자들에게 있습니다.
                </li>
                <li>
                  회사는 회원이 제공한 정보의 정확성을 확인하기 위해 합리적인 노력을 기울이나, 
                  모든 정보의 완전성을 보장하지는 않습니다.
                </li>
              </ol>
            </SubSection>
          </Section>

          {/* 제8장 분쟁해결 및 기타 */}
          <Section title="제8장 분쟁해결 및 기타">
            <SubSection title="제23조 (분쟁해결)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  회사는 회원이 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 
                  피해보상처리기구를 설치·운영합니다.
                </li>
                <li>
                  회사는 회원으로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 
                  다만, 신속한 처리가 곤란한 경우에는 회원에게 그 사유와 처리일정을 즉시 통보해 드립니다.
                </li>
                <li>
                  회사와 회원 간에 발생한 전자상거래 분쟁과 관련하여 회원의 피해구제신청이 있는 경우에는 
                  공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.
                </li>
              </ol>
            </SubSection>

            <SubSection title="제24조 (재판권 및 준거법)">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  회사와 회원 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 회원의 주소에 의하고, 
                  주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다.
                </li>
                <li>
                  회사와 회원 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.
                </li>
              </ol>
            </SubSection>
          </Section>

          {/* 부칙 */}
          <Section title="부칙">
            <Highlight>
              <SubSection title="제1조 (시행일)">
                <p>이 약관은 2025년 09월 01일부터 시행합니다.</p>
              </SubSection>
            </Highlight>

            <SubSection title="제2조 (경과조치)">
              <p>
                이 약관 시행 이전에 가입한 회원에게도 이 약관이 적용됩니다. 
                다만, 이 약관 시행 이전에 체결된 계약에 대해서는 종전의 약관이 적용됩니다.
              </p>
            </SubSection>
          </Section>
        </div>
      </div>
	)
}