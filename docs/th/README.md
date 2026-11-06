# เริ่มต้นใช้งาน EGM Stack

EGM Stack คือชุด skill สำหรับ agent ที่ทำงานแบบ spec-first

- Elephant คือ agent ที่ถือ context ของโปรเจกต์และร่างแบบ
- Goldfish คือ reviewer ที่เริ่มจาก context ว่างและพยายามหาจุดอ่อน
- คุณเป็นคนตัดสิน trade-off และอนุมัติแบบ

## ติดตั้ง

เลือกทางเดียวต่อ host

```sh
npx skills add jirayusueb/egm-stack -y
```

หรือผ่าน plugin

```sh
claude plugin marketplace add jirayusueb/egm-stack
claude plugin install egm-stack@egm-stack
```

omp ใช้

```sh
omp plugin marketplace add jirayusueb/egm-stack
omp plugin install egm-stack@egm-stack
```

หลังติดตั้งให้ restart host หรือ reload plugins

## เริ่มงาน

```text
/egm-setup
```

ตั้ง model และ budget ครั้งเดียว

```text
/egm-mode add webhook delivery; design it first, then implement and verify
```

สั่งงานด้วยผลลัพธ์ที่ตรวจได้ ไม่ต้องเลือก playbook เอง

```text
/egm-ask where am I
```

ถามว่าตอนนี้อยู่ขั้นไหนและควรรันอะไรต่อ

## ลำดับงานปกติ

1. brainstorm ทำ concepts brief
2. draft เขียน design doc ทีละส่วน
3. review ตรวจด้วย fresh-context reviewers
4. resolve จัดการ findings
5. implement และ verify
6. opening-a-pr เปิด pull request

งานเล็กที่แก้ไฟล์เดียวหรือไม่เกิน 50 บรรทัดและไม่แตะ public API ใช้ playbook `small-change` ได้

## ข้อควรระวัง

- ใช้ route เดียวต่อ host อย่าติดตั้งทั้ง plugin และ skills ซ้อนกัน
- มี 9 skill ที่ขึ้นต้นด้วย `egm-` อีก 38 ชื่อใช้ชื่อของตัวเอง
- ถ้าชื่อชนกับแพ็กอื่นใน omp จะถูกเรียกเป็น `egm-stack/<name>`
- หลังอัปเดตต้อง restart เสมอ

## อ่านต่อ

- [คู่มือภาษาอังกฤษ](../../README.md)
- [คำศัพท์](glossary.md)
- [คำสั่งทั้งหมด](../commands.md)
