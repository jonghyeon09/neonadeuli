'use client';
import Button from '@/components/common/Button';
import Modal from '@/components/modal';
import ModalView from '@/components/modal/ModalView';
import { useState } from 'react';

export default function HomeModal() {
  const [step, setStep] = useState(1);

  return (
    <Modal>
      {step == 1 && (
        <ModalView>
          <p className="text-black font-bold mb-5">경복궁 도착</p>
          <p className="text-center mb-5">
            이 곳에 당도한 것을 환영하오.
            <br /> 낯선 이여.
            <br /> 경복궁에 대한 안내가 필요하시오?
          </p>
          <div className="flex justify-between w-full gap-[19px]">
            <Button text="아니요" className="bg-[#f0f0f0]" />
            <Button text="네" className="bg-[#292929] text-white" />
          </div>
        </ModalView>
      )}
    </Modal>
  );
}
