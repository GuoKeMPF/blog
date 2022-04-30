import { Fragment, useState } from 'react';
import { Skeleton } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { uploadImage } from '@/services/upload';

const Editors = (props: { onChange?: (value: string) => void; value?: string }) => {
  const { onChange, value = '' } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [initValue] = useState<string>(value);
  const change = (v: string) => {
    if (onChange) {
      onChange(v);
    }
  };

  const mounted = () => {
    setLoading(false);
  };

  return (
    <Fragment>
      <Skeleton loading={loading} />
      <Editor
        initialValue={initValue}
        tinymceScriptSrc="/admin/editor/tinymce.min.js"
        onInit={mounted}
        init={{
          // 选定元素
          // 内联模式
          inline: false,
          // 不显示Powered by Tiny字样
          branding: false,
          // 中文
          language: 'zh_CN',
          // 引入部分需要自定义的css。相对于静态资源的路径
          // 编译框高度
          height: 360,
          // 插件
          // 部分功能是付费服务。没有key不会启用，工具栏功能会依赖这些插件
          plugins: `print preview paste importcss searchreplace autolink
            autosave save directionality code html visualblocks visualchars fullscreen
            image link media template codesample table charmap hr pagebreak
            nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools
            textpattern noneditable help charmap quickbars emoticons`,
          menubar: 'file edit view insert format tools table help',
          toolbar: `undo redo fullscreen |
            bold italic underline strikethrough |
            fontselect fontsizeselect formatselect |
            alignleft aligncenter alignright alignjustify |
            outdent indent |
            numlist bullist |
            forecolor backcolor removeformat |
            pagebreak |
            charmap emoticons |
             preview save print |
            insertfile image media template link anchor html codesample
            | ltr rtl`,
          toolbar_sticky: true,
          toolbar_mode: 'wrap',
          fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
          font_formats:
            '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
          // 显示的不可见字符的功能（空格回车）
          visualchars_default_state: true,
          visualblocks_default_state: true,
          images_upload_handler: uploadImage,
          // 图片高级配置
          image_advtab: true,
          image_uploadtab: true,
          // 代码编译语言
          codesample_languages: [
            { text: 'Java', value: 'java' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' },
            { text: 'HTML/XML', value: 'markup' },
            { text: 'CSS', value: 'css' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Python', value: 'python' },
          ],
          codesample_content_css: '/public/editor/prism/prism.css',
        }}
        onEditorChange={change}
      />
    </Fragment>
  );
};
export default Editors;
