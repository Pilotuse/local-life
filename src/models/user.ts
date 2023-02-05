// // 全局共享数据示例
import { useState, useEffect } from 'react';
import services from '@/services'

const useUser = () => {
  const [user, setUser] = useState<User>();

  const queryUserInfos = async () => {
    const result = await services.UserController.queryUserInfos()
    if (result?.success) {
      setUser(result?.data)
    }
  }

  useEffect(() => {
    queryUserInfos()
  }, [])


  const reloadUser = async () => {
    const result = await services.UserController.queryUserInfos()
    if (result?.success) {
      setUser(result?.data)
    }
  }

  return {
    user,
    setUser,
    methods: {
      reloadUser
    }
  };
};

export default useUser;
