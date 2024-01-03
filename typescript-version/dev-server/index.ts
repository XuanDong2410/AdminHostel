import cors from 'cors'
import express from 'express'

import { HostelReadonly } from '../src/types/Hostel'

const app = express()
app.use(cors())
app.get('/topusers', (req, res) => {
  const data = Array(10)
    .fill(null)
    .map((_, id) => ({
      id,
      name: `Nguyen Van ${id}`,
      gmail: 'nguyenvana@gmail.com',
      money: 123999,
      rolename: 'User',
      idrole: 4,
    }))
  res.json(data)
})
app.get('/tophostels', (req, res) => {
  const data = Array(4)
    .fill(null)
    .map((_, id) => ({
      id,
      title: `Phong trọ vip ${id + 1}`,
      username: `Nguyen Van ${id}`,
      rate: '4.5',
      numberrates: 99,
      love: 999,
      comment: 999,
      price: `1${id}.${id}00.000`,
      image: 'https://cloud.mogi.vn/images/2023/12/24/539/f53dea86d3724064bf4136b239896129.jpg',
      descriptions:
        'TÒA NHÀ 3 TẦNG - CÓ THANG MÁY - MỚI XÂY ( KHAI TRƯƠNG ) CÓ THANG MÁY - KHÓA VÂN TAY - CAMERA - NUÔI PET CÓ CAM KẾT',
    }))
  res.json(data)
})
app.get('/lovehostels', (req, res) => {
  const data = Array(4)
    .fill(null)
    .map((_, id) => ({
      id,
      title: `Phong trọ SINH VIEN ${id + 1}`,
      username: `Dao Van ${id}`,
      love: `${id + 1}${id + 3}${id + 62}`,
      price: `5.${id}00.000`,
      image:
        'https://www.cleanipedia.com/images/5iwkm8ckyw6v/2BYJo4A54os0d4U8QW5ltT/70c3975e1d734ec8fe429d6e004ca1c0/dGhpZXQta2UtcGhvbmctdHJvLWRlcC5qcGc/700w-467h/d%E1%BB%8Dn-d%E1%BA%B9p-ph%C3%B2ng-tr%E1%BB%8D.jpg',
      descriptions:
        'TÒA NHÀ 3 TẦNG - CÓ THANG MÁY - MỚI XÂY ( KHAI TRƯƠNG ) CÓ THANG MÁY - KHÓA VÂN TAY - CAMERA - NUÔI PET CÓ CAM KẾT',
    }))
  res.json(data)
})
app.get('/newhostels', (req, res) => {
  const data = Array(4)
    .fill(null)
    .map((_, id) => ({
      id,
      title: `Phong trọ Mới ${id + 1}`,
      username: `Nguyen Van ${id}`,
      rate: '4.5',
      numberrates: 79,
      love: `${id + 1}${id + 3}${id + 3}`,
      comment: `${id + 2}${id + 6}${id}`,
      price: `5.${id}00.000`,
      time: '01/01/2024',
      image:
        'https://s.meta.com.vn/img/thumb.ashx/Data/image/2020/11/24/mau-decor-trang-tri-phong-tro-sinh-vien-10.jpg',
      descriptions:
        'TÒA NHÀ 3 TẦNG - CÓ THANG MÁY - MỚI XÂY ( KHAI TRƯƠNG ) CÓ THANG MÁY - KHÓA VÂN TAY - CAMERA - NUÔI PET CÓ CAM KẾT',
    }))
  res.json(data)
})

app.get('/usernumbers', (req, res) => {
  const data = [
    {
      name: 'User',
      data: [44, 55, 41, 67, 22],
    },
    {
      name: 'Owner',
      data: [48, 50, 40, 65, 25],
    },
  ]
  res.json(data)
})
app.get('/numbercosts', (req, res) => {
  const data = [
      //= Array(4)
  // .fill(null)
  // .map(() =>  (
  //   {
      // price: '1.000.000 vnđ',
      // value: [
        {
          name: 'LOVE',
          data: [44, 75, 41, 37, 22, 8],
        },
        {
          name: 'COMMENT',
          data: [13, 63, 20, 8, 13, 7],
        },
        {
          name: 'RATE',
          data: [11, 47, 15, 15, 21],
        },
      //],
   // })
      ]
  res.json(data)
})
app.get('/numbermostcitys', (req, res) => {
  const data = [
    {
      name: 'Inflation',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ]
  res.json(data)
})
app.get('/users', (req, res) => {
  const data = Array(30)
    .fill(null)
    .map((_, id) => ({
      id,
      name: `Nguyễn Văn ${id}`,
      avatar: 'https://www.google.com/favicon.ico',
      gmail: 'nguyenvana@gmail.com',
      phone: '0987654321',
      money: '5.000.0000vnđ',
      rolename: 'User',
      idrole: 4,
    }))

  res.json(data)
})

app.get('/posts', (req, res) => {
  const data = Array(30)
    .fill(null)
    .map((_, id) => ({
      id,
      title: `Bài Đăng ${id}`,
      descriptions: 'Bai dang ve phong tro',
      time: '2022-10-5',
      image: 'http://www.google.com/favicon.ico',
      iduser: 1,
      username: `Nguyễn Văn ${id}`,
    }))
  res.json(data)
})
app.get('/hostels', (req, res) => {
  const data = Array(30)
    .fill(null)
    .map(
      (_, id): HostelReadonly => ({
        id,
        image: 'https://www.tapdoantrananh.com.vn/uploads/files/2020/11/09/nha-tro-gac-lung-dep-8.jpg',
        imageproperties: [
          'https://www.tapdoantrananh.com.vn/uploads/files/2020/11/09/nha-tro-gac-lung-dep-8.jpg',
          'https://www.cleanipedia.com/images/5iwkm8ckyw6v/2BYJo4A54os0d4U8QW5ltT/70c3975e1d734ec8fe429d6e004ca1c0/dGhpZXQta2UtcGhvbmctdHJvLWRlcC5qcGc/700w-467h/d%E1%BB%8Dn-d%E1%BA%B9p-ph%C3%B2ng-tr%E1%BB%8D.jpg',
          'https://s.meta.com.vn/img/thumb.ashx/Data/image/2020/11/24/mau-decor-trang-tri-phong-tro-sinh-vien-10.jpg',
          'https://luattrinam.vn/uploads/img/tu-van-hop-dong/Dang%20ky%20kinh%20doanh%20cho%20thue%20nha%20tro.jpg',
        ],
        title: 'Phòng trọ tại Hà Nội',
        description:
          'Phòng trọ giá rẻ dành cho sinh viên,TÒA NHÀ 3 TẦNG - CÓ THANG MÁY - MỚI XÂY ( KHAI TRƯƠNG ) CÓ THANG MÁY - KHÓA VÂN TAY - CAMERA - NUÔI PET CÓ CAM KẾT',
        acreage: '100m2',
        room: 4,
        emptyroom: 2,
        functionRoom: 'Điều hòa, nóng lạnh',
        love: 453,
        comment: 78,
        rate: 999,
        iduser: 3,
        rateproperties: [
          {
            name: '5 Stars',
            data: [38],
          },
          {
            name: '4 Stars',
            data: [53],
          },
          {
            name: '3 Stars',
            data: [32],
          },
          {
            name: '2 Stars',
            data: [19],
          },
          {
            name: '1 Stars',
            data: [25],
          },
        ],
        loveandcomment: {
          year: 2023,
          value: [
            {
              name: 'Love',
              data: [31, 140, 18, 51, 142, 109, 100, 31, 140, 18, 51, 109],
            },
            {
              name: 'Comment',
              data: [31, 210, 12, 11, 22, 19, 12, 210, 12, 11, 22, 19],
            },
          ],
        },
        range_time_analytics: {
          start: 2020,
          end: 2023,
        },
        // time: [
        //   '2023-12',
        //   '2023-11',
        //   '2022-10',
        //   '2022-09',
        //   '2022-08',
        //   '2022-07',
        //   '2023-06',
        //   '2023-05',
        //   '2023-04',
        //   '2023-03',
        //   '2023-02',
        //   '2023-01',
        // ],

        username: `Thanh Phạm ${id}`,
        address: 'Huỳnh Tấn Phát, Phường Phú Mỹ, Quận 7, TPHCM',
        price: `${id + 1}.${id}00.000vnđ`,
      }),
    )
  res.json(data)
})
app.get('/hostel-analytics/:id', (req, res) => {
  res.json({
    year: req.query.year,
    value: [
      {
        name: 'Love',
        data: [31, 140, 18, 51, 12, 19, 100, 31, 140, 18, 51, 109],
      },
      {
        name: 'Comment',
        data: [31, 210, 12, 11, 22, 19, 12, 210, 12, 11, 22, 19],
      },
    ],
  })
})
app.post('/user', (req, res) => {
  setTimeout(() => {
    const id = Math.round(Math.random() * 0xfffffff)
    res.json({
      id,
      name: `Nguyễn Văn ${id}`,
      avatar: 'https://www.google.com/favicon.ico',
      gmail: 'nguyenvana@gmail.com',
      phone: '0987654321',
      rolename: 'User',
      idrole: 4,
    })
  }, 1e3)
})
app.post('/post', (req, res) => {
  setTimeout(() => {
    const id = Math.round(Math.random() * 0xfffffff)
    res.json({
      id,
      title: `Bài Đăng ${id}`,
      descriptions: 'Bai dang ve phong tro',
      time: '2022-10-5',
      image: 'http://www.google.com/favicon.ico',
      iduser: 1,
      username: `Nguyễn Văn ${id}`,
    })
  }, 1e3)
})
app.post('/hostel', (req, res) => {
  setTimeout(() => {
    const id = Math.round(Math.random() * 0xfffffff)
    res.json({
      id,
      iduser: '2',
      username: `Nguyễn Văn ${id}`,
      image: 'https://www.google.com/favicon.ico',
      title: 'Phòng trọ tại Hà Nội',
    })
  }, 1e3)
})
app.delete('/user', (req, res) => {
  res.json({ ok: true })
})
app.delete('/post', (req, res) => {
  res.json({ ok: true })
})
app.delete('/hostel', (req, res) => {
  res.json({ ok: true })
})
app.patch('/user', (req, res) => {
  setTimeout(() => {
    const id = Math.round(Math.random() * 0xfffffff)
    res.json({
      id,
      name: `Nguyễn Văn ${id}`,
      avatar: 'https://www.google.com/favicon.ico',
      gmail: 'nguyenvana@gmail.com',
      phone: '0987654321',
      money: 50000000,
      rolename: 'User',
      idrole: 4,
    })
  }, 1e3)
})
app.patch('/post', (req, res) => {
  setTimeout(() => {
    const id = Math.round(Math.random() * 0xfffffff)
    res.json({
      id,
      title: `Bài Đăng ${id}`,
      descriptions: 'Bai dang ve phong tro',
      time: '2022-10-5',
      image: 'http://www.google.com/favicon.ico',
      iduser: 1,
      username: `Nguyễn Văn ${id}`,
    })
  }, 1e3)
})
app.patch('/hostel', (req, res) => {
  setTimeout(() => {
    const id = Math.round(Math.random() * 0xfffffff)
    res.json({
      id,
      iduser: '2',
      username: `Nguyễn Văn ${id}`,
      image: 'https://www.google.com/favicon.ico',
      title: 'Phòng trọ tại Hà Nội',
    })
  }, 1e3)
})
app.listen(3000)
