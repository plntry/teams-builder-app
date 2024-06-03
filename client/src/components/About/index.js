import React, { useState } from "react";
import { Typography, Flex, Timeline } from "antd";
import { DatabaseOutlined, BuildOutlined } from "@ant-design/icons";

const About = () => {
  const [timelineData, setTimelineData] = useState([
    {
      children: (
        <Flex vertical gap="20px">
          <Typography>
            Керуйте даними у розділі{" "}
            <b>
              <DatabaseOutlined /> Дані
            </b>
          </Typography>
          <Timeline
            items={[
              {
                children: (
                  <Typography>
                    Додавайте та редагуйте інформацію про спеціалізації у
                    розділі <b>Спеціалізації</b>
                  </Typography>
                ),
              },
              {
                children: (
                  <Typography>
                    Додавайте та редагуйте інформацію про кандидатів у розділі{" "}
                    <b>Кандидати</b>
                  </Typography>
                ),
              },
              {
                children: (
                  <Flex vertical gap="20px">
                    <Typography>
                      Додавайте та редагуйте інформацію про сумісності у розділі{" "}
                      <b>Сумісності</b>
                    </Typography>
                    <Timeline
                      items={[
                        {
                          children: (
                            <Typography>
                              Щоб сформувати команди, Вам необхідно додати
                              сумісності між кожною парою обраних кандидатів з
                              різних спеціалізацій
                            </Typography>
                          ),
                        },
                      ]}
                    />
                  </Flex>
                ),
              },
            ]}
          />
        </Flex>
      ),
    },
    {
      children: (
        <Flex vertical gap="20px">
          <Typography>
            Формуйте команди у розділі{" "}
            <b>
              <BuildOutlined /> Формування
            </b>
          </Typography>
          <Timeline
            items={[
              {
                children: (
                  <Typography>
                    Оберіть кандидатів для формування команд
                  </Typography>
                ),
              },
              {
                children: (
                  <Flex vertical gap="20px">
                    <Typography>
                      За потреби вкажіть власні значення для параметрів
                      бджолиного алгоритму для процесу формування команд
                    </Typography>
                    <Timeline
                      items={[
                        {
                          children: (
                            <Typography>
                              <b>Область пошуку</b>: Розмір області пошуку. Цей
                              параметр визначає кількість варіантів рішення,
                              згенерованих у початковій області пошуку та в
                              наступних ітераціях
                            </Typography>
                          ),
                        },
                        {
                          children: (
                            <Typography>
                              <b>Найкращі рішення</b>: Кількість найкращих
                              рішень, які потрібно зберегти та використовувати
                              для створення нових рішень у кожній ітерації
                            </Typography>
                          ),
                        },
                        {
                          children: (
                            <Typography>
                              <b>Ітерації без покращення</b>: Максимальна
                              дозволена кількість ітерацій без покращення
                              значення цільової функції
                            </Typography>
                          ),
                        },
                        {
                          children: (
                            <Typography>
                              <b>Кількість мутацій</b>: Кількість мутацій у
                              кожній ітерації
                            </Typography>
                          ),
                        },
                      ]}
                    />
                  </Flex>
                ),
              },
              {
                children: (
                  <Typography>
                    Сформуйте команди та перегляньте результати
                  </Typography>
                ),
              },
            ]}
          />
        </Flex>
      ),
    },
  ]);

  return (
    <Flex vertical gap="20px" justify="center" align="center">
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Як користуватися системою
      </Typography.Title>
      <Timeline items={timelineData} />
    </Flex>
  );
};
export default About;
