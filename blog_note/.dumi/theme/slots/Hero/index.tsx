// @ts-ignore
import { Link, useRouteMeta } from 'dumi';
import React from 'react';
import HeroTitle from '../HeroTitle';
import Cobe from './cobe';
import './index.less';

import { Button, Flex, Space } from 'antd';

function Hero() {
  const { frontmatter } = useRouteMeta();
  return (

    ('hero') in frontmatter && (
      <div className="custom-hore-container">
        <Cobe />
        <Flex gap="middle" align="center" justify="center" vertical>
          {frontmatter.hero!.title && (
            <HeroTitle>{frontmatter.hero!.title}</HeroTitle>
          )}
          {frontmatter.hero!.description && (
            <p
              dangerouslySetInnerHTML={{
                __html: frontmatter.hero!.description,
              }}
            />
          )}
          {Boolean(frontmatter.hero!.actions?.length) && (
            <Space>
              {frontmatter.hero!.actions!.map(({ text, link }) =>
                /^(\w+:)\/\/|^(mailto|tel):/.test(link) ? (
                  <Button
                    type="primary"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    key={text}
                  >
                    {text}
                  </Button>
                ) : (
                  <Link key={text} to={link}>
                    <Button type="primary">{text}</Button>
                  </Link>
                ),
              )}
            </Space>
          )}
        </Flex>
      </div>
    )

  );
}

export default Hero;
