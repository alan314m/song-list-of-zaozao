import React, { useState, useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import "react-toastify/dist/ReactToastify.css";

import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

import MusicList from "../public/music_list_zaozao.json";

import SongDetail from "../components/SongDetail.component";

import imageLoader from "../utils/ImageLoader";

export default function Home() {
  //状态保存: 搜索框和回到顶部按钮
  const [searchBox, setSearchBox] = useState("");
  const [showToTopButton, setToTopShowButton] = useState(false);

  useEffect(() => {
    //检测窗口滚动
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 600) {
        setToTopShowButton(true);
      } else {
        setToTopShowButton(false);
      }
    });
  }, []);

  //根据首字母和搜索框进行过滤
  const filteredSongList = MusicList.filter(
    (song) =>
      //搜索框搜歌名
      song.song_name
        ?.toString()
        .toLowerCase()
        .includes(searchBox ? searchBox.toLowerCase() : "") ||
      //搜索框搜歌手
      song.artist
        ?.toString()
        .toLowerCase()
        .includes(searchBox ? searchBox.toLowerCase() : "")
  );

  //处理用户复制行为
  const handleClickToCopy = (song) => {
    copy("点歌" + song.innerText);
    // navigator.clipboard.writeText("点歌 " + songName); //如支持iOS则可替换
    toast.success(`"` + song.innerText + `"成功复制到剪贴板!`);
  };

  //随便听听
  const handleRandomSong = () => {
    //定位歌单
    let parentSelector = document.querySelector(".songList");
    //随机生成序号
    let random = Math.floor(
      1 + Math.random() * parentSelector.childElementCount
    );
    let songName_ = document.querySelector(
      ".songList>tr:nth-child(" + random + ")"
    ).childNodes[1];
    if (!songName_) {
      toast.info("歌单已经没歌了!");
    } else {
      //如免费曲目
      copy("点歌" + songName_.innerText);
      toast.success(`"` + songName_.innerText + `"成功复制到剪贴板!`);
    }
  };

  //滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className={styles.outerContainer}>
      <Container>
        <Head>
          <title>盐芝早早o-O的歌单</title>
          <meta
            name="keywords"
            content="盐芝早早o-O,B站,bilibili,哔哩哔哩,电台唱见,歌单"
          />
          <meta name="description" content="盐芝早早的歌单" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Head>

        <section className={styles.main}>
          {/** 头像和标题 */}
          <Row>
            <Col>
              <div className={styles.centerFlexDiv}>
                <Image
                  loader={imageLoader}
                  className={styles.avatar}
                  src="zaoZaoAvatar.webp"
                  alt="早子的头像"
                  width={250}
                  height={250}
                />
              </div>
              <h1 className={"display-6 text-center pt-3 " + styles.grandTitle}>
                早早の歌单
              </h1>
              <div className={styles.centerFlexDiv}>
                <Link href="https://live.bilibili.com/21548051" passHref>
                  <a target="_blank">
                    <Button className={"mt-3 " + styles.customRandomButton}>
                      <img
                        className={styles.biliIcon}
                        src="/bilibili_logo.png"
                        alt="bilibili logo"
                      />{" "}
                      前往早早的直播间{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </Button>
                  </a>
                </Link>
              </div>
              <p className={"text-center pt-3 text-muted"}>
                轻点歌名可以复制哦
              </p>
            </Col>
          </Row>
          {/** 过滤器控件 */}
          <Row>
            <Col xs={12} md={9}>
              <Form.Control
                className={styles.filters}
                type="search"
                aria-label="搜索"
                placeholder="搜索"
                onChange={(e) => setSearchBox(e.target.value)}
              />
            </Col>
            <Col xs={12} md={3}>
              <div className="d-grid">
                <Button
                  className={styles.customRandomButton}
                  onClick={handleRandomSong}
                >
                  随便听听
                </Button>
              </div>
            </Col>
          </Row>
          {/** 歌单表格 */}
          <Row>
            <Col>
              <div className={styles.songListMarco}>
                <Container fluid>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>歌手</th>
                        <th>歌名</th>
                        {/** 
                                              <th>语言</th>
                        <th>备注</th>
                      */}
                      </tr>
                    </thead>
                    <tbody className="songList">
                      <SongDetail
                        filteredSongList={filteredSongList}
                        handleClickToCopy={handleClickToCopy}
                      />
                    </tbody>
                  </Table>
                </Container>
              </div>
            </Col>
          </Row>
        </section>
        {showToTopButton ? (
          <button
            onClick={scrollToTop}
            className={styles.backToTopBtn}
            title="返回顶部"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          </button>
        ) : (
          <div></div>
        )}
        <footer className={styles.footer}>
          Copyright © 2022 盐芝早早o-O@Bilibili
        </footer>
      </Container>
    </div>
  );
}
