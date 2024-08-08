'use client';
import Button from '@/components/common/Button';
import Modal from '@/components/modal';
import ModalView from '@/components/modal/ModalView';
import { useModalStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomeModal() {
  const [step, setStep] = useState(1);
  const { isArrive, toggleModal } = useModalStore();
  const router = useRouter();

  const handleStep = () => {
    setStep(2);
  };
  const handleTour = async () => {
    toggleModal('isArrive');
    router.push('/chat');
  };

  useEffect(() => {
    if (isArrive) {
      setStep(1);
    }
  }, [isArrive]);

  return (
    <>
      {isArrive && (
        <Modal>
          {step == 1 && (
            <ModalView>
              <p className="text-black font-bold mb-5">경복궁 도착</p>
              <p className="text-center mb-5">
                경복궁에 오신 것을 환영합니다!
                <br /> 안내가 필요하신가요?
              </p>
              <div className="flex justify-between w-full gap-[19px]">
                <Button className="bg-[#f0f0f0]" onClick={handleStep}>
                  아니요
                </Button>
                <Button
                  className="bg-[#292929] text-white"
                  onClick={handleTour}
                >
                  네
                </Button>
              </div>
            </ModalView>
          )}
          {step == 2 && (
            <ModalView>
              <p className="text-center mb-5">
                감사합니다.
                <br />
                &#39;지기톡&#39;으로 언제든지 대화를 나눠보세요.
              </p>
              <Button
                className="bg-[#292929] text-white"
                onClick={() => toggleModal('isArrive')}
              >
                확인
              </Button>
            </ModalView>
          )}
        </Modal>
      )}
    </>
  );
}
