'use client';
import Button from '@/components/common/Button';
import Modal from '@/components/modal';
import ModalView from '@/components/modal/ModalView';
import { useModalStore } from '@/store';
import { useEffect, useState } from 'react';

export default function HomeModal() {
  const [step, setStep] = useState(1);
  const { isArrive, toggleModal } = useModalStore();

  const handleStep = () => {
    setStep(2);
  };

  return (
    <>
      {isArrive && (
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
                <Button
                  text="아니요"
                  className="bg-[#f0f0f0]"
                  onClick={() => toggleModal('isArrive')}
                />
                <Button
                  text="네"
                  className="bg-[#292929] text-white"
                  onClick={handleStep}
                />
              </div>
            </ModalView>
          )}
          {step == 2 && (
            <ModalView>
              <p className="text-center mb-5">
                알겠소.
                <br /> 안내가 필요하다면 &#39;챗봇&#39; 버튼을 눌러
                <br /> 날 찾으시구려
              </p>
              <Button
                text="확인"
                className="bg-[#292929] text-white"
                onClick={() => toggleModal('isArrive')}
              />
            </ModalView>
          )}
        </Modal>
      )}
    </>
  );
}
