'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/card';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { Checkbox } from '@/src/shared/ui/checkbox';

type PackageType = 'basic' | 'standard' | 'premium';
type CleaningSchedule = 'daily' | 'weekly' | 'biweekly' | 'monthly';

interface PricingData {
  packageType: PackageType;
  areaSize: number;
  cleaningSchedule: CleaningSchedule;
  additionalOptions: string[];
  customRequests: Array<{ name: string; price: number }>;
}

export const PricingCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [pricingData, setPricingData] = useState<PricingData>({
    packageType: 'standard',
    areaSize: 10,
    cleaningSchedule: 'weekly',
    additionalOptions: [],
    customRequests: [],
  });

  const packagePrices: Record<PackageType, number> = {
    basic: 12000,
    standard: 22000,
    premium: 35000,
  };

  const areaMultipliers: Record<PackageType, number> = {
    basic: 200,
    standard: 500,
    premium: 1000,
  };

  const additionalOptions = [
    { id: 'toilet_cleaning', name: '화장실 정리', price: 3000 },
    { id: 'urgent_24h', name: '24시간 내 요청', price: 10000 },
    { id: 'urgent_4h', name: '4시간 내 긴급 요청', price: 20000 },
  ];

  const calculateSubtotal = () => {
    let total = packagePrices[pricingData.packageType];

    const areaExtra = pricingData.areaSize - 10;
    if (areaExtra > 0) {
      total += areaExtra * areaMultipliers[pricingData.packageType];
    }

    const selectedOptions = additionalOptions.filter(option =>
      pricingData.additionalOptions.includes(option.id)
    );
    total += selectedOptions.reduce((sum, option) => sum + option.price, 0);

    total += pricingData.customRequests.reduce((sum, request) => sum + request.price, 0);

    return total;
  };

  const addCustomRequest = () => {
    setPricingData(prev => ({
      ...prev,
      customRequests: [...prev.customRequests, { name: '', price: 0 }],
    }));
  };

  const updateCustomRequest = (index: number, field: 'name' | 'price', value: string | number) => {
    setPricingData(prev => ({
      ...prev,
      customRequests: prev.customRequests.map((request, i) =>
        i === index ? { ...request, [field]: value } : request
      ),
    }));
  };

  const removeCustomRequest = (index: number) => {
    setPricingData(prev => ({
      ...prev,
      customRequests: prev.customRequests.filter((_, i) => i !== index),
    }));
  };

  const toggleAdditionalOption = (optionId: string) => {
    setPricingData(prev => ({
      ...prev,
      additionalOptions: prev.additionalOptions.includes(optionId)
        ? prev.additionalOptions.filter(id => id !== optionId)
        : [...prev.additionalOptions, optionId],
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const subtotal = calculateSubtotal();
  const vatAmount = Math.round(subtotal * 0.1);
  const totalWithVat = subtotal + vatAmount;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <div className={`w-12 h-1 mx-2 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Package Selection */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>서비스 패키지 선택</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(Object.entries(packagePrices) as [PackageType, number][]).map(([type, price]) => (
              <div
                key={type}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  pricingData.packageType === type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPricingData(prev => ({ ...prev, packageType: type }))}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg capitalize">{type} 패키지</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    ₩{price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Area Size */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>공간 크기 설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                청소 실평수: {pricingData.areaSize}평
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={pricingData.areaSize}
                onChange={(e) =>
                  setPricingData(prev => ({ ...prev, areaSize: parseInt(e.target.value) }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>10평</span>
                <span>30평</span>
                <span>50평</span>
              </div>
            </div>

            {pricingData.areaSize > 10 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  {pricingData.areaSize - 10}평 추가 × ₩{areaMultipliers[pricingData.packageType].toLocaleString()} ={' '}
                  ₩{((pricingData.areaSize - 10) * areaMultipliers[pricingData.packageType]).toLocaleString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Additional Options */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>추가 옵션 선택</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleAdditionalOption(option.id)}
                >
                  <Checkbox
                    checked={pricingData.additionalOptions.includes(option.id)}
                    onChange={() => toggleAdditionalOption(option.id)}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{option.name}</p>
                    <p className="text-sm text-gray-600">+₩{option.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Requests */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">추가 요청 사항</h4>
              {pricingData.customRequests.map((request, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="작업 내용"
                    value={request.name}
                    onChange={(e) => updateCustomRequest(index, 'name', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="가격"
                    value={request.price || ''}
                    onChange={(e) =>
                      updateCustomRequest(index, 'price', parseInt(e.target.value) || 0)
                    }
                  />
                  <Button variant="outline" size="sm" onClick={() => removeCustomRequest(index)}>
                    삭제
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addCustomRequest}>
                + 추가 요청 항목
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Summary */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>견적 요약</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>패키지 ({pricingData.packageType})</span>
                <span>₩{packagePrices[pricingData.packageType].toLocaleString()}</span>
              </div>

              {pricingData.areaSize > 10 && (
                <div className="flex justify-between">
                  <span>청소 실평수 추가 ({pricingData.areaSize - 10}평)</span>
                  <span>
                    ₩{((pricingData.areaSize - 10) * areaMultipliers[pricingData.packageType]).toLocaleString()}
                  </span>
                </div>
              )}

              {pricingData.additionalOptions.map((optionId) => {
                const option = additionalOptions.find(opt => opt.id === optionId);
                return option ? (
                  <div key={optionId} className="flex justify-between">
                    <span>추가 옵션: {option.name}</span>
                    <span>₩{option.price.toLocaleString()}</span>
                  </div>
                ) : null;
              })}

              {pricingData.customRequests
                .filter(req => req.name && req.price > 0)
                .map((request, index) => (
                  <div key={index} className="flex justify-between">
                    <span>추가 요청: {request.name}</span>
                    <span>₩{request.price.toLocaleString()}</span>
                  </div>
                ))}

              <div className="border-t pt-2 flex justify-between text-gray-700">
                <span>소계</span>
                <span>₩{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>VAT (10%)</span>
                <span>₩{vatAmount.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>최종 예상 금액 (VAT 포함)</span>
                <span className="text-blue-600">₩{totalWithVat.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          이전
        </Button>

        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">₩{subtotal.toLocaleString()}</div>
          <div className="text-sm text-gray-500">예상 금액 (VAT 별도)</div>
        </div>

        {currentStep < 4 ? (
          <Button onClick={nextStep}>다음</Button>
        ) : (
          <div className="w-18" />
        )}
      </div>
    </div>
  );
};
