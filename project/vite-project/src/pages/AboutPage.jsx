import React from 'react';
import { motion } from 'framer-motion'; // Импортируем motion из framer-motion
import bahmutImage from '../assets/bahmut.png';
import sozhitelImage from '../assets/sozhitel.png';
import vitazyImage from '../assets/vitazy.png';

function AboutPage() {
  return (
    <div className="relative h-screen bg-cover bg-center bg-[url('./assets/background.png')]">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Центрируем текст с помощью Flexbox */}
      <div className="flex items-center justify-center absolute inset-0 z-10 text-white pt-20">
        <div className="flex flex-col items-center justify-center bg-black bg-opacity-50 p-8 rounded-lg space-y-6 w-full max-w-4xl">
          {/* Анимация для блока "О нас" */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="font-bold text-5xl md:text-7xl leading-tight mb-4">
              О нас
            </div>
          </motion.div>
          {/* Анимация для описания */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="text-xl md:text-2xl mb-6">
              "Tazy Polit" — уникальный политический сервер в мире Minecraft, который сочетает в себе элементы управления, экономики и гражданского общества с использованием мода Create и других увлекательных модификаций. На этом сервере игроки могут создавать свои собственные государства, участвовать в выборах, формировать правительства и взаимодействовать с экономическими системами, основанными на механике модов.
            </div>
            <div className="font-bold text-5xl md:text-7xl leading-tight mb-4">
              Наша команда
            </div>
          </motion.div>

          {/* Круги с картинками и именами участников с анимацией */}
          <div className="flex gap-12 justify-center mt-12">
            {/* Участник 1 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
                <img src={vitazyImage} alt="Team Member 1" className="w-full h-full object-cover" />
              </div>
              <div className="text-center text-xl">Vitazy</div>
            </motion.div>

            {/* Участник 2 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
                <img src={sozhitelImage} alt="Team Member 2" className="w-full h-full object-cover" />
              </div>
              <div className="text-center text-xl">Sozhitel</div>
            </motion.div>

            {/* Участник 3 */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.9 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
                <img src={bahmutImage} alt="Team Member 3" className="w-full h-full object-cover" />
              </div>
              <div className="text-center text-xl">Ivan_Bahmut</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
