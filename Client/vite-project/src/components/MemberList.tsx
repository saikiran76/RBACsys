import React, { useState } from 'react';
import {FiSearch, FiChevronDown, FiMoreHorizontal} from 'react-icons/fi';
import Button from './Button';

interface Member {
  id: string;
  name: string;
  username: string;
  avatar: string;
  projects: number;
  accessExpires: string;
  role: string[];
}

const MemberList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRole, setSelectedRole] = useState('Multiple roles');
  const [sortBy, setSortBy] = useState('Sort by account');

  const members: Member[] = [
    {
      id: '1',
      name: 'Clora',
      username: '@konstantinkonstantinopolsky',
      avatar: 'https://i.pravatar.cc/40?img=1',
      projects: 1000,
      accessExpires: 'In 12 months',
      role: ['Admin', 'User'],
    },
    {
      id: '1',
      name: 'Maurice',
      username: '@konstantinkonstantinopolsky',
      avatar: 'https://i.pravatar.cc/40?img=1',
      projects: 1000,
      accessExpires: 'In 12 months',
      role: ['Admin', 'User'],
    },
  ];

  return (
    <div className="bg-gray-800 backdrop-blur-md rounded-lg p-6 sm:min-w-[24rem] md:min-w-[40rem] lg:min-w-[55rem] xl:min-w-[70rem] mx-3 ml-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-white">Members (1000)</h1>
        </div>
        <div className="flex space-x-3">
          <Button>Add User</Button>
          <Button>Edit Roles</Button>
        </div>
      </div>

      <div className="flex space-x-8 border-b mb-6">
        <button
          className={`pb-2 ${
            activeTab === 'all' ? 'border-b-2 border-lime-500 text-lime-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`pb-2 ${
            activeTab === 'admins' ? 'border-b-2 border-lime-500 text-lime-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('admins')}
        >
          Admins
        </button>
        <button
          className={`pb-2 ${
            activeTab === 'users' ? 'border-b-2 border-lime-500 text-lime-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('users')}
        >
          Public Users
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-lime-50 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        <div className="relative">
          <button className="px-4 py-2 bg-lime-50 rounded-md flex items-center space-x-2">
            <span>Roles</span>
            <FiChevronDown />
          </button>
        </div>
        <div className="relative">
          <button className="px-4 py-2 bg-lime-50 rounded-md flex items-center space-x-2">
            <span>{sortBy}</span>
            <FiChevronDown />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <img src={member.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-medium text-white">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.username}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{member.projects}</p>
                <p className="text-sm text-gray-500">Projects</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Access expires</p>
                <p className='text-white'>{member.accessExpires}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <div className="relative">
                  <button className="px-4 py-1 bg-lime-50 rounded-md flex items-center space-x-2">
                    <span>{selectedRole}</span>
                    <FiChevronDown />
                  </button>
                </div>
              </div>
              
            </div>
            <div className="mt-2 flex justify-between items-center">
              <button className="text-lime-500 hover:text-lime-600">Delete</button>
              <button className="text-gray-400 hover:text-gray-600">
                <FiMoreHorizontal />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;