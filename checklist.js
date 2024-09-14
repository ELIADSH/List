"use client";
import { useState } from 'react';

export default function Checklist() {
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'הזמנת טיסות', done: false, subTasks: ['השוואת מחירים', 'בדיקת תנאי מזוודות', 'בחירת מושבים', 'וידוא תקנות קורונה'] },
    { id: 2, text: 'הוצאת ויזה', done: false, subTasks: ['בדיקת הצורך בויזה', 'איסוף מסמכים נדרשים', 'הגשת בקשה אונליין', 'קבלת אישור ויזה'] },
    { id: 3, text: 'בדיקת דרכון', done: false, subTasks: ['תוקף דרכון', 'בדיקת עמודים ריקים'] },
    { id: 4, text: 'ביטוח נסיעות', done: false, subTasks: ['השוואת פוליסות', 'רכישת ביטוח', 'קבלת מסמכים והדפסה'] },
    { id: 5, text: 'הזמנת מלונות', done: false, subTasks: ['חיפוש מלונות', 'בדיקת דירוגים', 'ביצוע הזמנה'] },
    { id: 6, text: 'ארגון מזוודות', done: false, subTasks: ['בגדים מתאימים', 'ציוד חיוני', 'מסכות וג'ל חיטוי'] }
  ]);

  const handleCheck = (id) => {
    const updatedList = checklist.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    );
    setChecklist(updatedList);
  };

  const handleSubTaskCheck = (id, subTask) => {
    const updatedList = checklist.map(item => {
      if (item.id === id) {
        const updatedSubTasks = item.subTasks.map(task =>
          task === subTask ? `${task} - בוצע` : task
        );
        return { ...item, subTasks: updatedSubTasks };
      }
      return item;
    });
    setChecklist(updatedList);
  };

  const completionRate = (checklist.filter(item => item.done).length / checklist.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl text-center mb-6">צ'ק ליסט לטיול בווייטנאם</h1>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">התקדמות: {completionRate.toFixed(2)}%</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div className="bg-green-500 h-4 rounded-full" style={{ width: `${completionRate}%` }}></div>
        </div>

        <ul>
          {checklist.map(item => (
            <li key={item.id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-xl ${item.done ? 'line-through' : ''}`}>{item.text}</p>
                  <ul className="pl-4">
                    {item.subTasks.map(subTask => (
                      <li key={subTask}>
                        <input type="checkbox" onClick={() => handleSubTaskCheck(item.id, subTask)} />
                        <span className="ml-2">{subTask}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <input 
                  type="checkbox" 
                  checked={item.done} 
                  onChange={() => handleCheck(item.id)} 
                  className="w-6 h-6"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}