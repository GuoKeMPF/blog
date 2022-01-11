import styles from './Content.less';

export default ({ title = '', description = '', content = '' }) => <div className={styles.container}>
    <p className={styles.title}>{title}</p>
    <p className={styles.description}>{description}</p>
    <section className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></section>
</div>

