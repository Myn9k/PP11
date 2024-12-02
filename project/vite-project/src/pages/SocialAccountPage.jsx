import React from 'react';
import { motion } from 'framer-motion'; // Импортируем motion из framer-motion

function SocialAccountPage() {
  return (
    <div className="relative h-screen bg-cover bg-center bg-[url('./assets/background.png')]">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Центрируем текст с помощью Flexbox */}
      <div className="flex items-center justify-center absolute inset-0 z-10 text-white pt-20">
        <div className="flex flex-col items-center justify-center bg-black bg-opacity-50 p-8 rounded-lg space-y-6">
          {/* Анимация для блока "О нас" */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }} // Начальная позиция (не видим, сдвинут вниз)
            animate={{ opacity: 1, y: 0 }} // Конечная позиция (видим, на месте)
            transition={{ duration: 1, ease: "easeOut" }} // Параметры анимации
          >
            <div className="font-bold text-5xl md:text-7xl leading-tight mb-4">
              Наши социальные сети
            </div>
            <div className="text-xl md:text-2xl mb-6">
              Лучший политический сервер в Minecraft
            </div>
          </motion.div>
          {/* Анимация для описания */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }} // Начальная позиция (не видим, сдвинут вниз)
            animate={{ opacity: 1, y: 0 }} // Конечная позиция (видим, на месте)
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} // Параметры анимации с задержкой
          >
            <div className="text-xl md:text-lg">
              "Tazy Polit" — уникальный политический сервер в мире Minecraft, который сочетает в себе элементы управления, экономики и гражданского общества с использованием мода Create и других увлекательных модификаций. На этом сервере игроки могут создавать свои собственные государства, участвовать в выборах, формировать правительства и взаимодействовать с экономическими системами, основанными на механике модов.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SocialAccountPage;
