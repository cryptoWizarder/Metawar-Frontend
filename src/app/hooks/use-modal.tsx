'use client'
import { createContext, FC, Fragment, ReactNode, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Nullable } from '@/app/interfaces/api.interfaces';

type ModalState = {
  register: (name: string, component: FC<any>) => void;
  open: <T extends JSX.IntrinsicAttributes>(name: string, props?: T) => void;
  close: () => void;
};

const ModalContext = createContext<ModalState>({
  register: () => {},
  open: () => {},
  close: () => {},
});

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [comps, setComps] = useState<Record<string, FC>>({});
  const [current, setCurrent] = useState<Nullable<JSX.Element>>(null);
  const [currentModal, setCurrentModal] = useState<Nullable<string>>(null);

  function open<T extends JSX.IntrinsicAttributes = {}>(name: string, props: T = {} as T) {
    const Component = comps[name];

    if (!Component) {
      console.error('Component not registered. Please register your component first');
      return;
    }

    setCurrentModal(name);
    setCurrent(<Component {...props} />);
  }

  function close() {
    setCurrent(null);
  }

  const register = (name: string, comp: FC<any>) => {
    setComps((state) => ({ ...state, [name]: comp }));
  };

  return (
    <ModalContext.Provider value={{ open, close, register }}>
      {children}
      <Transition appear show={!!current} as={Fragment}>
        <Dialog as="div" className="relative z-[300]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={clsx(
                    'w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-[#051f2b] relative',
                    {
                      'h-[90vh]': currentModal === 'menu',
                    },
                  )}
                >
                  {current}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};

export { useModal, ModalProvider };